#!/bin/bash

clean() {
    echo -e "\nDeleting existing minified files..."
    find . -name \*.min.js -exec rm {} \;
    find . -name \*.min.css -exec rm {} \;
}

minify_js() {
    echo -e "\nMinifying JavaScript..."
    jslist=`find . -type f -name \*.js`
    
    for jsfile in $jslist
    do
        echo "Processing: ${jsfile}"
        java -jar ${YUICOMPRESSOR} -o ${jsfile} ${jsfile}
    done    
}

minify_css() {
    echo -e "\nMinifying CSS..."
    csslist=`find . -type f -name \*.css`
    
    for cssfile in $csslist
    do
        echo "Processing: ${cssfile}"
        java -jar ${YUICOMPRESSOR} -o ${cssfile%.*}.min.css ${cssfile}
    done
}

usage() {
    echo -e "\nminify.sh [-cjdh]"
    echo "  c : minify CSS files"
    echo "  j : minify Javascript files"
    echo "  d : delete existing minified CSS and Javascript files"
    echo "  h: print this help"
}

CSS=false
JS=false
DELETE=false
HELP=false

while getopts "cjdh" input
do
    case $input in
        c ) CSS=true;;
        j ) JS=true;;
        d ) DELETE=true;;
        h ) HELP=true;;
    esac
done

if ! $JS && ! $CSS && ! $DELETE
then
    usage
    exit 0
fi

if $HELP
then
    usage
    exit 0
fi

if ! [ `find . -type f -name yuicompressor\*.jar` ]
then
    echo "Unable to locate the YUI Compressor jar file!"
    exit 1
else 
    YUICOMPRESSOR=`find . -type f -name yuicompressor\*.jar`
fi

if $DELETE
then
    clean
fi

if $JS
then
    minify_js
fi

if $CSS
then
    minify_css
fi

echo -e "\nDone."
exit 0
