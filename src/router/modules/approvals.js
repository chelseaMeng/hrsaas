import Layout from '@/layout'
export default {
    path: "/approvals",
  
    component: Layout,
    children: [
      {
        //path: "" ,不写redirect就还是路由 path: "/approvals",
        path: "",
        name:'approvals',
        component: () => import("@/views/approvals/index"),
        meta: { title: "审批",icon:'tree-table'},
      },
    ],
  } 
