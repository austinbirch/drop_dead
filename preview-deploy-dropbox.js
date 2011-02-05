#!/usr/bin/env bash
git log -n 5 --date=short --pretty=format:"%ad: %s%n" > RECENT_CHANGES
echo "copying..."
cp -R -f ../drop_dead/ ~/Dropbox/Public/drop_dead2/
echo "minify-ing..."
cd ~/Dropbox/Public/drop_dead2/
bash ~/Dropbox/Public/drop_dead2/minify.sh -jd &
wait
echo 'http://dl.dropbox.com/u/420066/drop_dead2/drop_dead.html'