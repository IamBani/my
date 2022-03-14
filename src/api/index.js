import { fetchApi, fetchApiGet } from "./https";
//公共组件
// fetchApi  POST
// fetchApiGet Get


//// 生成会员卡
//get /common/common/GetCode    typey =1(会员卡是1)
export const GetCode = (url, data) => {
    return fetchApiGet({

        url: `/common/common/GetCode?type=1`,
        data,
       
    });
};

//登录  
// POST  /login/service/loginForAdmin
export const loginForAdmin = ( data, page) => {
    return fetchApi({
      url: `/login/service/loginForAdmin`,
      data,
    });
  };
//新增菜单
// POST  /managerMenu/managerMenu/AddMenu
export const AddMenu = ( data, page) => {
    return fetchApi({
      url: `/managerMenu/managerMenu/AddMenu`,
      data,
    });
  };
  //编辑
//   POST /managerMenu/managerMenu/EditMenu
export const EditMenu = ( data, page) => {
    return fetchApi({
      url: `/managerMenu/managerMenu/EditMenu`,
      data,
    });
  };
//菜单列表
// POST /managerMenu/managerMenu/queryByPage
export const AddMenuQueryByPage = ( data, page) => {
    return fetchApi({
      url: `/managerMenu/managerMenu/queryByPage`,
      data,
    });
  };
//   删除菜单列表 query
//   GET /managerMenu/managerMenu/queryById
export const MenuqueryById = ( data, page) => {
    return fetchApiGet({
      url: `/managerMenu/managerMenu/queryById?id=`+data.id,
      data,
    });
  };
// 新增商品
// POST /managerCommodity/managerCommodity/AddCommodity
export const AddCommodity = ( data, page) => {
    return fetchApi({
      url: `/managerCommodity/managerCommodity/AddCommodity`,
      data,
    });
  };
  // 字典表父新增
  // POST /managerDict/managerDict/AddDict
  export const AddFAddDict = ( data, page) => {
    return fetchApi({
      url: `/managerDict/managerDict/AddDict`,
      data,
    });
  };
  // 父字典表列表
  // POST /managerDict/managerDict/queryByPage
  export const FqueryByPageDict = ( data, page) => {
    return fetchApi({
      url: `/managerDict/managerDict/queryByPage`,
      data,
    });
  };
  //父字典 编辑
  // POST /managerDict/managerDict/EditDict
  export const FzdbEditDict = (data, page) => {
    return fetchApi({
      url: `/managerDict/managerDict/EditDict`,
      data,
    });
  };
  // 父字典删除 query
  // POST /managerDict/managerDict/deleteById
  export const FzdbdeleteById = (data, page) => {
    return fetchApi({
      url: `/managerDict/managerDict/deleteById?id=`+data.id,
      // data,
    });
  };
// 父 查子 字典列表
  //POST  /managerDictitem/managerDictitem/queryByPage
  export const ZqueryByPageDict = (url,data, page) => {
    return fetchApi({
      url: `/managerDictitem/managerDictitem/queryAllByDict?id=${data}`,
      data,
    });
  };
  //字典查询查询 通过主键查询 单条记录
  // http://192.168.18.107:8085/managerDictitem/managerDictitem/queryById?id=56
  // GET /managerDictitem/managerDictitem/queryById
  export const SelectqueryById = (data, page) => {
    return fetchApiGet({
      url: `/managerDictitem/managerDictitem/queryById`,
      data,
    });
  };

  // 子字典 新增
  // POST /managerDictitem/managerDictitem/AddDictitem
  export const ZAddDictitemDict = (data, page) => {
    return fetchApi({
      url: `/managerDictitem/managerDictitem/AddDictitem`,
      data,
    });
  };
// 主表 分页查子表
// POST /managerDictitem/managerDictitem/queryAllByDict

export const FcZqueryAllByDict = (data, page) => {
  return fetchApi({
    url: `/managerDictitem/managerDictitem/queryAllByDict`,
    data,
  });
};
// 子表的编辑
// POST /managerDictitem/managerDictitem/EditDictitem
export const ZqueryAllByDict = (data, page) => {
  return fetchApi({
    url: `/managerDictitem/managerDictitem/EditDictitem`,
    data,
  });
};

  //子字典删除 query
  // POST /managerDictitem/managerDictitem/deleteById
  export const ZzdbdeleteById = (data, page) => {
    return fetchApi({
      url: `/managerDictitem/managerDictitem/deleteById?id=`+data.id,
      // data,
    });
  };
  // 新增角色管理 
  // POST /managerRole/managerRole/AddRole
  export const AddRole = (data, page) => {
    return fetchApi({
      url: `/managerRole/managerRole/AddRole`,
      data,
    });
  };
    //  角色管理  分页列表
  // POST /managerRole/managerRole/queryByPage
  export const RolequeryByPage = (data, page) => {
    return fetchApi({
      url: `/managerRole/managerRole/queryByPage`,
      data,
    });
  };
  // 角色管理 编辑
  // POST /managerRole/managerRole/EditRole
  export const RoleEditRole = (data, page) => {
    return fetchApi({
      url: `/managerRole/managerRole/EditRole`,
      data,
    });
  };
  // 角色管理 删除
// POST /managerRole/managerRole/deleteById
export const RoledeleteById = (data, page) => {
  return fetchApi({
    url: `/managerRole/managerRole/deleteById?id=`+data.id,
    // data,
  });
};
// 新增门店
// POST /managerStore/managerStore/AddStore
export const MDAddStore = (data, page) => {
  return fetchApi({
    url: `/managerStore/managerStore/AddStore`,
    data,
  });
};
// 门店列表 查询

// 门店列表 
// POST /managerStore/managerStore/GetStoreByPage
export const MDGetStoreByPage = (data, page) => {
  return fetchApi({
    url: `/managerStore/managerStore/GetStoreByPage`,
    data,
  });
};
// 门店编辑
// POST /managerStore/managerStore/EditStore
export const MDEditStore = (data, page) => {
  return fetchApi({
    url: `/managerStore/managerStore/EditStore`,
    data,
  });
};
// 门店 删除
// POST /managerStore/managerStore/deleteById
export const MDdeleteById = (data, page) => {
  return fetchApi({
    url: `/managerStore/managerStore/deleteById?id=`+data.id,
    // data,
  });
};
//新增用户
// POST /managerUser/managerUser/AddUser
export const XZyhAddUser = (data, page) => {
  return fetchApi({
    url: `/managerUser/managerUser/AddUser`,
    data,
  });
};

// 编辑用户
// POST /managerUser/managerUser/EditUser
export const XZyhEditUser = (data, page) => {
  return fetchApi({
    url: `/managerUser/managerUser/EditUser`,
    data,
  });
};
// 用户 列表
// POST /managerUser/managerUser/queryByPage
export const XZyhqueryByPage = (data, page) => {
  return fetchApi({
    url: `/managerUser/managerUser/queryByPage`,
    data,
  });
};
// 删除 用户
// POST /managerUser/managerUser/deleteById
export const yhdeleteById = (data, page) => {
  return fetchApi({
    url: `/managerUser/managerUser/deleteById?id=`+ data.id,
    // data,
  });
};
// 用户 初始化
// POST /managerUser/managerUser/Initialization
export const yhInitialization = (data, page) => {
  return fetchApi({
    url: `/managerUser/managerUser/Initialization?id=`+ data.id,
    // data,
  });
};

// 操作日志列表  查询
// POST /managerLog/managerLog/queryByPage
// POST /managerLog/managerLog/queryByPage
export const CZqueryByPage = (data, page) => {
  return fetchApi({
    url: `/managerLog/managerLog/queryByPage`,
    data,
  });
};

// 新增会员信息
// POST /managerMember/managerMember/AddMember
export const XZAddMember = (data, page) => {
  return fetchApi({
    url: `/managerMember/managerMember/AddMember`,
    data,
  });
};
// 编辑 会员信息
// POST /managerMember/managerMember/EditMember
export const HYEditMember = (data, page) => {
  return fetchApi({
    url: `/managerMember/managerMember/EditMember`,
    data,
  });
};
//查询会员列表
// POST /managerMember/managerMember/queryByPage
export const HYqueryByPage = (data, page) => {
  return fetchApi({
    url: `/managerMember/managerMember/queryByPage`,
    data,
  });
};
//编辑会员列表
// POST /managerMember/managerMember/EditMember
export const bjEditMember = (data, page) => {
  return fetchApi({
    url: `/managerMember/managerMember/EditMember`,
    data,
  });
};

// 删除会员
// POST  /managerMember/managerMember/deleteById
export const HYdeleteById = (data, page) => {
  return fetchApi({
    url: ` /managerMember/managerMember/deleteById?id=`+data.id,
    data,
  });
};


/**
 *
 * 商品列表
 * @param {*} data
 * @returns
 */

 export function getOrderList(data) {
  return fetchApi({ url: '/managerCommodity/managerCommodity/queryByPage', data});
}

/**
 *
 * 分类列表
 * @param {*} data
 * @returns
 */
 export function getOrderClassify(data) {
  return fetchApi({ url: '/managerDictitem/managerDictitem/queryAllByDict',data });
}


/**
 *
 * 单文件上传
 * @param {*} paramsList
 * @returns
 */
 export function fileupload(paramsList) {
  const formData = new FormData();
  formData.append('file', paramsList);
  return fetchApi({ url: '/file/upload', method: 'post', data: formData });
}