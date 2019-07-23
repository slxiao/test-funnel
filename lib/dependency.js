"use strict";

import madge from "madge";
import path from 'path';

function getFileDependencies(file) {
    return madge(file).then((res) => {
        var array = Object.keys(res.obj());
        array.pop();
        return array.map(function (i) { return path.join(file, '..', i)});
    });
}

function getBulkDependencies(files) {
    return Promise.all(
        files.map(
          file => getFileDependencies(file).then(
              out => new  Promise((resolve, reject) => {
                resolve({ [file]: out })
              })
          )
        )
    )
}

export { getBulkDependencies };