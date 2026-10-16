const assert = require('node:assert/strict');
const { EventEmitter } = require('node:events');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const { registerCommand } = require('../src/utils/commandsHandler');
const { registerEvents } = require('../src/utils/eventsHandler');

function createTempDir(t) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'mashiro-bot-test-'));
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
    return directory;
}

test('event loader ignores non-directories and registers clientReady once', (t) => {
    const eventDir = createTempDir(t);
    const startupDir = path.join(eventDir, 'clientReady');
    fs.mkdirSync(startupDir);
    fs.writeFileSync(path.join(eventDir, 'notes.txt'), 'ignored');
    fs.writeFileSync(
        path.join(startupDir, 'ready.js'),
        'module.exports = (client) => { client.readyCount = (client.readyCount || 0) + 1; };'
    );

    const client = new EventEmitter();
    client.events = [];
    registerEvents(client, eventDir);
    client.emit('clientReady');
    client.emit('clientReady');

    assert.equal(client.readyCount, 1);
    assert.deepEqual(client.events, ['clientReady/ready.js']);
});

test('event loader catches rejected handler promises', async (t) => {
    const eventDir = createTempDir(t);
    const eventFolder = path.join(eventDir, 'interactionCreate');
    fs.mkdirSync(eventFolder);
    fs.writeFileSync(
        path.join(eventFolder, 'reject.js'),
        "module.exports = async () => { throw new Error('expected failure'); };"
    );

    const client = new EventEmitter();
    client.events = [];
    const originalError = console.error;
    const logged = [];
    console.error = (...args) => logged.push(args);
    try {
        registerEvents(client, eventDir);
        client.emit('interactionCreate');
        await new Promise((resolve) => setImmediate(resolve));
    } finally {
        console.error = originalError;
    }

    assert.match(String(logged[0]?.[0]), /interactionCreate\/reject\.js failed/);
    assert.match(String(logged[0]?.[1]?.message), /expected failure/);
});

test('command loader validates module shape and registers valid commands', (t) => {
    const commandDir = createTempDir(t);
    fs.writeFileSync(
        path.join(commandDir, 'ping.js'),
        "module.exports = { data: { name: 'ping' }, execute() {} };"
    );
    const client = { commands: new Map() };

    registerCommand(client, commandDir);

    assert.equal(client.commands.get('ping').data.name, 'ping');
});

test('command loader rejects invalid modules', (t) => {
    const commandDir = createTempDir(t);
    fs.writeFileSync(path.join(commandDir, 'broken.js'), 'module.exports = {};');

    assert.throws(
        () => registerCommand({ commands: new Map() }, commandDir),
        /must export data\.name and execute\(\)/
    );
});
