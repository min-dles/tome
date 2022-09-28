# Add changes to git.
git add .
# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
    then msg="$1"
fi
git commit -m "$msg"
# Push source and build repos.
git push -u origin main

cd exampleSite/themes/tome
sleep 2
git pull