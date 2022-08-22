<template>
  <div class="app-container">
    <el-tabs v-model="activeName">
      <el-tab-pane label="角色管理" name="first">
        <!-- 按钮 -->
        <el-row style="height: 60px">
          <el-button type="primary" icon="el-icon-plus" @click="addRole"
            >新增角色</el-button
          >
        </el-row>
        <!-- 表格 -->
        <el-table border :data="list" style="width: 100%" v-loading="loading">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>

          <el-table-column prop="name" label="角色名称" width="120">
          </el-table-column>

          <el-table-column prop="description" label="描述"> </el-table-column>

          <el-table-column prop="address" label="操作" width="320">
            <template slot-scope="scope">
              <el-button type="success">分配权限</el-button>
              <el-button type="primary" @click="edit(scope.row)"
                >编辑</el-button
              >
              <el-button type="danger" @click="del(scope.row.id)"
                >删除</el-button
              >
            </template>
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
      <el-tab-pane label="公司信息" name="first">
        <el-alert title="对公司名称、公司地址、营业执照、公司地址的更新,将使得公司资料被重新审核，请谨慎修改" type="info" show-icon> </el-alert>
        <el-form label-width="120px" style="margin-top: 50px">
          <el-form-item label="公司名称">
            <el-input disabled style="width: 400px" v-model='formData.name'/>
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input disabled style="width: 400px" v-model='formData.companyAddress'/>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input disabled style="width: 400px" v-model='formData.mailbox'/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" :rows="3" disabled style="width: 400px" v-model='formData.remarks'/>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 弹出框 -->
    <roleDialog
      ref="roleDialog"
      :dialog-visible.sync="dialogVisible"
    ></roleDialog>
    <!-- sync拆分成dialogVisible属性 和 update:dialogVisible='接收子组件传递过来的值 改变dialogVisible的值'-->
  </div>
</template>

<script>
import { getRoleList, deleteRole,getCompanyInfo } from "@/api/setting";
import roleDialog from "./components/roleDialog";
import {mapGetters} from 'vuex'
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
      dialogVisible: false,
    };
  },
  computed:{
    ...mapGetters(['companyId'])
  },
  components: {
    roleDialog,
  },
  mounted() {
    this.getRoleList();
    this.getCompanyInfo();
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
    changePage() {
      this.getRoleList();
    },
    changeSize() {
      this.getRoleList();
    },
    addRole() {
      this.dialogVisible = true;
    },
    edit(row) {
      this.dialogVisible = true;
      this.$refs.roleDialog.roleForm = { ...row };
    },
    async del(id) {
      console.log(id);
      try {
        await this.$confirm("是否确认删除该角色?", "提示", { type: "warning" });
        await deleteRole(id);
        this.$message.success("角色删除成功");
        this.page.page = 1;
        this.getRoleList();
        console.log("=====");
      } catch (e) {
        console.log(e);
      }
    },
    async getCompanyInfo(){
      this.forData=await getCompanyInfo(this.companyId)
    }
  },
};
</script>

<style lang="scss" scoped></style>
