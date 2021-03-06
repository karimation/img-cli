#!/usr/bin/env node

"use strict";

const program = require("commander");
const crawler = require("./src/crawler.js");
const download = require("./src/download.js");
const styles = require("./src/styles");

const isURL = (url) => {
  const pattern = /^(http(s)?:\/\/)(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
  return pattern.test(url);
};

program.version("1.0.0", "-v, --version").description("Images Downloader");

program
  .command("all <url>")
  .alias("a")
  .description(
    "download all images from url with optional directory name and specific image type"
  )
  .option("-d, --directory [directory]", "choose a specific directory name")
  .option("-t, --type [type]", "Choose a image type (png, jpg, gif..)")
  .action((url, options) => {
    styles.clear();
    styles.spinner1.start();
    const type = options.type || "all";
    const directory = options.directory || "images";
    if (!isURL(url)) {
      styles.spinner1.fail();
      console.log();
      styles.error("ERROR: invalid url");
    } else {
      crawler.getImage(url, type, directory);
    }
  });

program
  .command("solo <url>")
  .alias("s")
  .description("download spefic image")
  .option("-d, --directory [directory]", "choose a specific directory name")
  .action((url, options) => {
    styles.clear();
    styles.spinner2.start();
    const directory = options.directory || "images";
    if (!isURL(url)) {
      styles.spinner2.fail();
      console.log();
      styles.error("ERROR: Invalid URL format");
    } else {
      download.solo(directory, "solo", url);
    }
  });
program
  .command("*")
  .description("unsupported command")
  .action(() => {
    styles.clear();
    styles.error(
      "Invalid command\nSee img --help for a list of available commands."
    );
  });

program.parse(process.argv);

// unsupported command
if (!program.args.length) {
  styles.clear();
  program.help();
}
