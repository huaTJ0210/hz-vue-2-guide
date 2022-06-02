/**
 **  虚拟DOM进行patch时会触发钩子函数create、update、destory
 ** 这三个钩子函数都会触发updateDirectives
 */

export function updateDirectives(oldNode, vnode) {
  if (oldNode.data.directives || vnode.data.directives) {
    _update(oldNode, vnode)
  }
}

function _update(oldNode, vnode) {
  const isCreate = oldNode === emptyNode
  const isDestroy = (vnode = emptyNode)

  const oldDirs = [] //旧的指令集合
  const newDirs = [] // 新的指令集合

  const dirsWithInsert = []
  const dirsWithPostpatch = []

  let key, oldDir, dir
  for (key in newDirs) {
    oldDir = oldDirs[key]
    dir = newDirs[key]
    if (!oldDir) {
      //此时的指令是新的指令
      callhook(dir, 'bind', vnode, oldNode)
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir)
      }
    } else {
      // 指令已经存在
      dir.oldValue = oldDir.value
      callhook(dir, 'update', vnode, oldNode)
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir)
      }
    }
  }

  if (dirsWithInsert.length) {
    const callInsert = () => {
      for (let i = 0; i < dirsWithInsert.length; i++) {
        callhook(dirsWithInsert[i], 'inserted', vnode, oldNode)
      }
    }
    if (isCreate) {
      // 合并mergeVNodeHook
    } else {
      callInsert()
    }
  }
  if (dirsWithPostpatch.length) {
    //
  }
  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // 指令不存在，触发unbind
        callhook(oldDirs[key], 'unbind', isDestroy)
      }
    }
  }
}

const emptyNode = {}

function callhook() {}
