import { glob } from "glob";
import fs from "fs";
import url from "url";
import { oldSite } from "../env.mjs";

const { base: inputBase, inputDomain, outputDomain } = oldSite;

const mimeType = (extension) => {
  switch (extension) {
    case "css":
      return "text/css";
    case "xml":
      return "text/xml";
    case "gif":
      return "image/gif";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "js":
      return "application/javascript";
    case "atom":
      return "application/atom+xml";
    case "rss":
      return "application/rss+xml";
    case "mml":
      return "text/mathml";
    case "txt":
      return "text/plain";
    case "jad":
      return "text/vnd.sun.j2me.app-descriptor";
    case "wml":
      return "text/vnd.wap.wml";
    case "htc":
      return "text/x-component";
    case "avif":
      return "image/avif";
    case "png":
      return "image/png";
    case "svg":
    case "svgz":
      return "image/svg+xml";
    case "tif":
    case "tiff":
      return "image/tiff";
    case "wbmp":
      return "image/vnd.wap.wbmp";
    case "webp":
      return "image/webp";
    case "ico":
      return "image/x-icon";
    case "jng":
      return "image/x-jng";
    case "bmp":
      return "image/x-ms-bmp";
    case "woff":
      return "font/woff";
    case "woff2":
      return "font/woff2";
    case "jar":
    case "war":
    case "ear":
      return "application/java-archive";
    case "json":
      return "application/json";
    case "hqx":
      return "application/mac-binhex40";
    case "doc":
      return "application/msword";
    case "pdf":
      return "application/pdf";
    case "ai":
    case "ps":
    case "eps":
      return "application/postscript";
    case "rtf":
      return "application/rtf";
    case "m3u8":
      return "application/vnd.apple.mpegurl";
    case "kml":
      return "application/vnd.google-earth.kml+xml";
    case "kmz":
      return "application/vnd.google-earth.kmz";
    case "xls":
      return "application/vnd.ms-excel";
    case "eot":
      return "application/vnd.ms-fontobject";
    case "ppt":
      return "application/vnd.ms-powerpoint";
    case "odg":
      return "application/vnd.oasis.opendocument.graphics";
    case "odp":
      return "application/vnd.oasis.opendocument.presentation";
    case "ods":
      return "application/vnd.oasis.opendocument.spreadsheet";
    case "odt":
      return "application/vnd.oasis.opendocument.text";
    case "pptx":
      return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
    case "xlsx":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    case "wmlc":
      return "application/vnd.wap.wmlc";
    case "wasm":
      return "application/wasm";
    case "7z":
      return "application/x-7z-compressed";
    case "cco":
      return "application/x-cocoa";
    case "jardiff":
      return "application/x-java-archive-diff";
    case "jnlp":
      return "application/x-java-jnlp-file";
    case "run":
      return "application/x-makeself";
    case "pl":
    case "pm":
      return "application/x-perl";
    case "prc":
    case "pdb":
      return "application/x-pilot";
    case "rar":
      return "application/x-rar-compressed";
    case "rpm":
      return "application/x-redhat-package-manager";
    case "sea":
      return "application/x-sea";
    case "swf":
      return "application/x-shockwave-flash";
    case "sit":
      return "application/x-stuffit";
    case "tcl":
    case "tk":
      return "application/x-tcl";
    case "der":
    case "pem":
    case "crt":
      return "application/x-x509-ca-cert";
    case "xpi":
      return "application/x-xpinstall";
    case "xhtml":
      return "application/xhtml+xml";
    case "xspf":
      return "application/xspf+xml";
    case "zip":
      return "application/zip";
    case "bin":
    case "exe":
    case "dll":
      return "application/octet-stream";
    case "deb":
      return "application/octet-stream";
    case "dmg":
      return "application/octet-stream";
    case "iso":
    case "img":
      return "application/octet-stream";
    case "msi":
    case "msp":
    case "msm":
      return "application/octet-stream";
    case "mid":
    case "midi":
    case "kar":
      return "audio/midi";
    case "mp3":
      return "audio/mpeg";
    case "ogg":
      return "audio/ogg";
    case "m4a":
      return "audio/x-m4a";
    case "ra":
      return "audio/x-realaudio";
    case "3gpp":
    case "3gp":
      return "video/3gpp";
    case "ts":
      return "video/mp2t";
    case "mp4":
      return "video/mp4";
    case "mpeg":
    case "mpg":
      return "video/mpeg";
    case "mov":
      return "video/quicktime";
    case "webm":
      return "video/webm";
    case "flv":
      return "video/x-flv";
    case "m4v":
      return "video/x-m4v";
    case "mng":
      return "video/x-mng";
    case "asx":
    case "asf":
      return "video/x-ms-asf";
    case "wmv":
      return "video/x-ms-wmv";
    case "avi":
      return "video/x-msvideo";
    case "html":
    case "htm":
    case "shtml":
    default:
      return "text/html";
  }
};

const base = `scrap/${inputBase}`;

const resouces = await glob(`${base}/**`, {
  ignore: {
    ignored: (p) => p.isDirectory(),
  },
});

const getExtension = (path) => {
  const [_, match] = path.match(/(?:.)([a-zA-Z0-9]+$)/) || [];
  return match || "";
};

const removeBase = (base, path) => path.replace(base, "");
const loadResource = (path, ext) => ({
  mime: mimeType(ext),
  body: fs.readFileSync(path),
});

const sites = resouces.reduce((target, path) => {
  const ext = getExtension(path);
  const subPath = removeBase(base, path);
  const domain = "/" + subPath.split("/")[1];
  const website = (target[domain] = target[domain] ?? {});
  website[removeBase(domain, subPath)] = loadResource(path, ext);
  return target;
}, {});

const last = (arr) => arr[arr.length - 1];
const notEmptyString = (str) => str !== "";
const replaceDomain = (str) =>
  inputDomain === outputDomain
    ? str
    : str.replaceAll(inputDomain, outputDomain);

const replace = (body) =>
  replaceDomain(body.replace("</head>", '<meta charset="UTF-8"></head>'));

export default (req, res) => {
  const { pathname, query } = url.parse(req.url);
  console.log({ pathname, query, req });
  const resourcePath =
    pathname.replace(/\/$/, "") +
    (query ? `?${query}` : "") +
    (last(pathname.split("/").filter(notEmptyString))?.includes(".")
      ? ""
      : "/index");
  const page = sites["/" + inputDomain][resourcePath];
  if (page == null) {
    console.warn("Not found", { pathname, resourcePath, page: page?.mime });
    return res.end("Page not found");
  }
  res.setHeader("Content-Type", page.mime);
  res.writeHead(200);
  res.end(
    page?.mime === "text/html"
      ? replace(page.body.toString("utf8"))
      : page.body,
  );
};
