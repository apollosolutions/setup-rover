const core = require('@actions/core');
const toolCache = require('@actions/tool-cache');
const path = require('path');

async function setup() {
    try {
        const version = core.getInput('version');
        const arch = core.getInput('arch');
        const tarFileName = `rover-${version}-${arch}`;
        const url = `https://github.com/apollographql/rover/releases/download/${version}/${tarFileName}.tar.gz`;
        core.info(`Downloading Rover from ${url}`);

        const toolPath = await getPath(url, version);
        core.addPath(toolPath);
        core.info(`Rover ${version} is installed at ${toolPath}`);
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        } else {
            core.setFailed(`${error}`);
        }
    }
}

async function getPath(url, version) {
    const toolPath = toolCache.find('rover', version);
    if (toolPath) {
        core.info('Rover is already installed on tool path');
        return toolPath;
    } else {
        core.info('Rover not found on tool path. Downloading file');
        return installRover(url, version);
    }
}

async function installRover(url, version) {
    const downloadPath = await toolCache.downloadTool(url);
    const extract = url.endsWith('.zip') ? toolCache.extractZip : toolCache.extractTar;
    const extractedPath = await extract(downloadPath);
    const pathToCli = path.join(extractedPath, 'dist');
    return toolCache.cacheDir(pathToCli, 'rover', version);
}

module.exports = setup;

if (require.main === module) {
    setup();
}
