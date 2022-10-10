import * as core from '@actions/core';
import * as toolCache from '@actions/tool-cache';

async function run() {
    // Get version to install (defaults to "latest")
    const version = core.getInput('version');
    const url = `https://rover.apollo.dev/nix/${version}`;

    // Install the resolved version if necessary
    const toolPath = toolCache.find('rover', version)
    if (toolPath) {
        core.addPath(toolPath)
    } else {
        core.info(`Downloading Rover ${version} from ${url}...`)
        await installRover(url, version)
    }

    core.info(`Rover ${version} is installed`)
}

async function installRover(url, version) {
    const tarPath = await toolCache.downloadTool(url);
    const extractedPath = await toolCache.extractTar(tarPath)
    const cachedPath = await toolCache.cacheDir(extractedPath, 'rover', version)
    core.addPath(cachedPath)
}

run().catch((error) => {
    if (error instanceof Error) {
        core.setFailed(error.message)
    } else {
        core.setFailed(`${error}`)
    }
})