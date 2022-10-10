# setup-rover

Install the Rover binary to be used in GitHub Actions

**The code in this repository is experimental and has been provided for reference purposes only. Community feedback is welcome but this project may not be supported in the same way that repositories in the official [Apollo GraphQL GitHub organization](https://github.com/apollographql) are. If you need help you can file an issue on this repository, [contact Apollo](https://www.apollographql.com/contact-sales) to talk to an expert, or create a ticket directly in Apollo Studio.**

## Usage
Install the latest version of `rover`
```yaml
steps:
  - uses: apollosolutions/setup-rover@main
```

Install a specific version and machine architecture. These values are used to create the download url. See the full list of available downloads in the [Rover releases page](https://github.com/apollographql/rover/releases)
```yaml
steps:
  - uses: apollosolutions/setup-rover@main
    with:
      version: 'v0.9.1'
      arch: 'x86_64-unknown-linux-gnu'
```

## Known Limitations

This does a simple download and extracts a tar file.

## Notes

This repo was created with lots of help from the GitHub docs: https://docs.github.com/en/actions/creating-actions/developing-a-third-party-cli-action
