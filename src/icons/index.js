import Vue from "vue";
import SvgIcon from "@/components/SvgIcon"; // svg component

// register globally

Vue.component("svg-icon", SvgIcon);
// 批量导入svg图片

//()里第一个'./svg'是文件的路径,false是是否想文件内的子文件夹查找,/\.svg$/是匹配以.svg结尾的文件
//req是返回的一个方法,
const req = require.context("./svg", false, /\.svg$/);

// function fn(val) {
//   console.log(val);
//   return val;
// }

// [1, 2, 3, 4, 5].map(fn);
// [1, 2, 3, 4, 5].map((ele) => fn(ele));
// map的方法和下面的是一样的

const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
console.log(req.keys()); //返回的是所有的文件路径
console.log(req("./dashboard.svg")); //得到的是具体的图片
requireAll(req);
console.log(requireAll(req));
