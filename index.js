const core = require('@actions/core');
const toolCache = require('@actions/tool-cache');

async function run() {
    const version = core.getInput('version');
    const arch = core.getInput('arch');
    const tarFileName = `rover-${version}-${arch}`;
    const url = `https://github.com/apollographql/rover/releases/download/${version}/${tarFileName}.tar.gz`;
    core.info(`Downloading Rover from ${url}`);

    // Get the path to the binary
    const toolPath = await getPath(url, version, arch);
    core.addPath(toolPath);
    core.info(`Rover ${version} is installed at ${toolPath}`);
}

async function getPath(url, version, arch) {
    const toolPath = toolCache.find('rover', version, arch);
    if (toolPath) {
        core.info('Rover is already installed on tool path');
        return toolPath;
    } else {
        core.info('Rover not found on tool path. Downloading file');
        return installRover(url, version, arch);
    }
}

async function installRover(url, version, arch) {
    const tarPath = await toolCache.downloadTool(url);
    const extractedPath = await toolCache.extractTar(tarPath);
    return toolCache.cacheDir(extractedPath, 'rover', version, arch);
}

run().catch((error) => {
    if (error instanceof Error) {
        core.setFailed(error.message);
    } else {
        core.setFailed(`${error}`);
    }
});