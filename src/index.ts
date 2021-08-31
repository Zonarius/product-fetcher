#!/usr/bin/env -S node -r "ts-node/register"

import { Command, Option } from 'commander';
import { take, toArray } from 'rxjs';
import { logger } from './logger';
import modules from './modules';

const { version } = require("../package.json");
const program = new Command();

process.env["NODE_OPTIONS"] = "--insecure-http-parser";

program
  .name("product-fetcher")
  .description("Fetches product data from various sources.")
  .version(version)
  .option("-v, --verbose", "Verbose output")
  .option("--list-sources", "Lists all available sources")
  .option("-l, --limit <limit>", "The maximum number of products to fetch", Number, -1)
  .argument("[url]", "The url to fetch products from")
  .action(main)
  .parse();

async function main(url: string) {
  const options = program.opts();
  logger.level = options.verbose
    ? "debug"
    : "info";
    
  if (options.listSources) {
    Object.keys(modules).forEach(m => console.log(m));
    return;
  }

  if (!url) {
    program.help({ error: true })
  }

  const matched = Object.values(modules).find(f => f.matches(url));
  if (!matched) {
    logger.error("No module matches the URL!");
    return;
  }

  const obs = options.limit >= 0
    ? matched.fetchProducts(url).pipe(take(options.limit))
    : matched.fetchProducts(url);

  obs.pipe( toArray() )
    .subscribe(products => {
      console.log(JSON.stringify({ products }));
    })
}