const core = require('@actions/core');
const toolCache = require('@actions/tool-cache');

async function run() {
    const version = core.getInput('version');
    const arch = core.getInput('arch');
    const tarFileName = `rover-${version}-${arch}`;
    const url = `https://github.com/apollographql/rover/releases/download/${version}/${tarFileName}.tar.gz`;
    core.info(`Downloading Rover from ${url}`);

    // Install the resolved version if necessary
    const toolPath = toolCache.find('rover', version);
    if (toolPath) {
        core.info('Rover is already installed on tool path');
        core.addPath(toolPath);
    } else {
        core.info('Rover not found on tool path. Downloading file');
        await installRover(url, version);
    }

    core.info(`Rover ${version} is installed`);
}

async function installRover(url, version) {
    const tarPath = await toolCache.downloadTool(url);
    const extractedPath = await toolCache.extractTar(tarPath);
    const cachedPath = await toolCache.cacheDir(extractedPath, 'rover', version);
    core.addPath(cachedPath);
}

run().catch((error) => {
    if (error instanceof Error) {
        core.setFailed(error.message);
    } else {
        core.setFailed(`${error}`);
    }
});