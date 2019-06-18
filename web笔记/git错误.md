## git无法pull仓库refusing to merge unrelated histories

如果合并了两个不同的开始提交的仓库，在新的 git 会发现这两个仓库可能不是同一个，为了防止开发者上传错误，于是就给下面的提示

`fatal: refusing to merge unrelated histories`

如我在Github新建一个仓库，写了License，然后把本地一个写了很久仓库上传。这时会发现 github 的仓库和本地的没有一个共同的 commit 所以 git 不让提交，认为是写错了 `origin` ，如果开发者确定是这个 `origin` 就可以使用 `--allow-unrelated-histories`  告诉 git 自己确定 ：

 `git pull origin master --allow-unrelated-histories `



##  Git提交到GitHub报错：Updates were rejected because the remote contains work that you do not have locally 

究其原因，是因为在GitHub上创建远程仓库时，勾选了 Initialize this repository with a README这项，导致远程仓库不为空，解决办法，先将远程仓库的内容合并到本地，然后再上传即可，命令如下： 

`git pull --rebase origin master`

`git push -u origin master`