#!/bin/sh
# A simple script with a function...
. "$(dirname -- "$0")/_/husky.sh"
CURRENT_PATH="$PWD"
PATH_TO_PACKAGES="$CURRENT_PATH/packages"
PATH_TO_ROOT_FROM_PACKAGES="../.."
NO_CHANGES=0

set_file_list()
{
 file_list=$(git diff --diff-filter=d --staged --name-only)
}

set_package_list()
{
  package_list=$(ls $PATH_TO_PACKAGES)
}

set_current_package()
{
 current_package=$1
}

set_changes_in_package()
{
  files_changed=$(echo "$file_list" | grep -E "packages\/$current_package\/.+$" || echo '')
}

pre_commit_checks()
{
  cd ${PATH_TO_PACKAGES}/${current_package} && yarn precommit
  cd ${PATH_TO_ROOT_FROM_PACKAGES}
}

run_commit_checks()
{
  if [ ${#files_changed} -gt ${NO_CHANGES} ]
  then
    pre_commit_checks
  fi
}

pre_commit()
{
  for package_element in ${package_list}
  do
    set_current_package "$package_element"
    set_changes_in_package
    run_commit_checks

  done
}

main()
{
  set_file_list
  set_package_list
  pre_commit
}

###
# Main body of script starts here
###
main
