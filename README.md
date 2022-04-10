# `aws-lambda` #

AWS Lambda Function `npm` Package(s) for [`iac-factory`](https://github.com/iac-factory).

## Usage ##

```shell
git clone https://github.com/iac-factory/aws-lambda.git

npm run install
```

## `npm` Publication ##

In order to successfully publish updated package(s):

```shell
cd "$(git rev-parse --show-toplevel)" && npm run publish
```

## Notice - Package Naming ##

Located in the [`./packages`](./packages) folder, there contains various
`npm` packages. Each package is named differently than its `npm` counterpart.

Given the availability of concise lambda-related `npm` package names, **it was
decided against publishing to `iac-factory`** (e.g. `@iac-factory/template`). 
Such offers developers more concise `import()`, `npx` execution, and `package.json` installation.

The folder names -- in the context of development via the monorepository -- also
keeps things simple. However, it's worth noting that there are intentional differences.
