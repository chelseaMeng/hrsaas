<template>
  <div>
    <!-- 弹出框 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="`${roleForm.id ? '修改' : '新增'}角色`"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 表单 -->
      <el-form ref="roleDialogForm" label-width="80px" :model="roleForm">
        <!-- 将验证规则rules写在具体的表单项上 -->
        <el-form-item
          prop="name"
          label="角色"
          :rules="{ required: true, message: '请输入角色', trigger: 'blur' }"
        >
          <el-input v-model="roleForm.name" placeholder="请输入角色"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="描述">
          <!--:rules="{ required: true, message: '请输入描述', trigger: 'blur' }" -->
          <el-input
            type="textarea"
            row="3"
            v-model="roleForm.description"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
        type="flex"
        justify="center"
        align="middle"
      >
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="submitRole"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
//完善新增角色的组件的功能
//dialogVisible是通过父组件传过来的
// 如何实现dialogVisible在组件上的双向绑定
import { addRole,updateRole } from "@/api/setting";
export default {
  data() {
    return {
      // dialogVisible: true,
      roleForm: {
        name: "",
        description: "",
      },
      loading: false,
    };
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  created() {},

  methods: {
    handleClose() {
      // console.log(1111);
      // this.dialogVisible = false;
      this.$emit("update:dialogVisible", false);
      this.$refs.roleDialogForm.resetFields();
       this.roleForm= {
        name: "",
        description: "",
      }
    },
    async submitRole() {
      //标签校验通过时候
      //validate()
      try {
        await this.$refs.roleDialogForm.validate(); //返回一个promise
        //新增接口
        this.loading = true;
        //表单数据有id就是修改角色否则新增角色
        this.roleForm.id
          ? await updateRole(this.roleForm)
          : await addRole(this.roleForm);
        //调用父组件里面的获取角色列表的方法
        this.$parent.getRoleList();
        //提示新增成功
        this.$message.success(`角色${this.roleForm.id ? "修改" : "新增"}成功`);
        //弹窗关闭
        this.handleClose();
      } catch (e) {
        console.log(e);
      } finally {
        //不管成功失败都会进入finally
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped></style>
