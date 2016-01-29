'use strict';

const path = require('path');

class ScpRequest {
    constructor(config, filePath) {
        this.config = config;
        this.filePath = filePath;
        
        // find path relative to config.watchPath
        this.relativePath = path.relative(this.config.watchPath, this.filePath);
        
        // append this path to config.destPath to determine dest path
        this.destPath = path.join(this.config.destPath, this.relativePath).replace(/\\/g, '/');
    }
    
    run(client) {
        // scp file
        console.log(`Copying ${this.relativePath} to ${this.destPath}...`);
        client.upload(this.filePath, this.destPath, err => this.onFileCopied(err));
    }
    
    onFileCopied(err) {
        if(err) {
            console.error(`[ERROR]: Copying file ${this.relativePath}. ${err}`);
        }
        else {
            console.log(`COPIED: ${this.relativePath} to ${this.destPath}`);
        }
    }
}

module.exports = ScpRequest;
