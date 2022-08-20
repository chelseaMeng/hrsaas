<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="角色管理" name="first">
        <!-- 按钮 -->
        <el-row style="height: 60px">
          <el-button type="primary" icon="el-icon-plus">新增角色</el-button>
        </el-row>
        <!-- 表格 -->
        <el-table border :data="list" style="width: 100%" v-loading="loading">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>

          <el-table-column prop="name" label="角色名称" width="120">
          </el-table-column>

          <el-table-column prop="description" label="描述"> </el-table-column>

          <el-table-column prop="address" label="操作" width="320">
            <el-button type="success">分配权限</el-button>
            <el-button type="primary">编辑</el-button>
            <el-button type="danger">删除</el-button>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row style="height: 60px" type="flex" justify="end" align="middle">
          <el-pagination
            background
            layout="prev, pager, next,total,sizes"
            :page-sizes="[5, 10, 20, 30, 40]"
            :current-page.sync="page.page"
            :page-size.sync="page.pagesize"
            :total="1000"
            @current-change="changePage"
            @size-change="changeSize"
          >
          </el-pagination>
        </el-row>
      </el-tab-pane>

      <!-- 公司信息 -->
      <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
    </el-tabs>
    <roleDialog></roleDialog>
  </div>
</template>

<script>
import { getRoleList } from "@/api/setting";
import roleDialog from './components/roleDialog'
export default {
  name: "Hrsaas1Index",
  data() {
    return {
      activeName: "first",
      page: {
        page: 1,
        pagesize: 10,
      },
      list: [],
      total: 0,
      loading: false,
    };
  },
components:{
  roleDialog
},
  mounted() {
    this.getRoleList();
  },

  methods: {
    async getRoleList() {
      try {
        this.loading = true;
        const { rows, total } = await getRoleList(this.page);
        (this.list = rows), (this.total = total);
        console.log(this.list);
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
    },
    changePage(){
      this.getRoleList()
    },
    changeSize(){
      this.getRoleList()
    }
  },
};
</script>

<style lang="scss" scoped></style>
