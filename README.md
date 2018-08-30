## What is this?

A fork of https://github.com/hyperledger/fabric-samples. This is a WIP that nobody should use without first analyzing it since it could break a fabric installation.

## How to install it?

1. Install HyperLedger Fabric [prerequisites](https://hyperledger-fabric.readthedocs.io/en/latest/prereqs.html)
2. Install HyperLedger Fabric [samples, binaries and docker images](http://hyperledger-fabric.readthedocs.io/en/latest/install.html).

Note that to install it you must use a specific branch (javiEstrella-custom-samples) from a forked fabric repo (javiEstrella/fabric), so the correct installation command is:

```bash
curl -sSL https://raw.githubusercontent.com/javiEstrella/fabric/javiEstrella-custom-samples/scripts/bootstrap.sh | bash -s 1.2.0 1.2.0 0.4.10
```
