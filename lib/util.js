'use strict';

import fs from 'fs';
import path from 'path';

function recFindByExt(base, ext, files, result)
{
    var files = files || fs.readdirSync(base);
    var result = result || [];

    files.forEach(
        function (file) {
            var newbase = path.join(base,file);
            if ( fs.statSync(newbase).isDirectory() )
            {
                result = recFindByExt(newbase, ext, fs.readdirSync(newbase), result);
            }
            else
            {
                if ( file.substr(-1*(ext.length)) == ext )
                {
                    result.push(newbase);
                }
            }
        }
    )
    return result
}


function parse(str) {
    var args = [].slice.call(arguments, 1),
        i = 0;

    return str.replace(/%s/g, () => args[i++]);
}


function twoArrayOverlap(array1, array2) {
    var element1;
    var element2;

    for (element1 of array1) {
        for (element2 of array2) {
            if (element1 == element2) {
                return true;
            }
        }
    }
    return false;
}

export { recFindByExt, parse, twoArrayOverlap };
