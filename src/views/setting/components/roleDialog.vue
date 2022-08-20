<template>
  <div>
    <!-- 弹出框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 表单 -->
      <el-form ref="roleDialogForm" label-width="80px">
        <el-form-item prop="name" label="角色">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" row="3"></el-input>
        </el-form-item>
      </el-form>

      <span
        slot="footer"
        class="dialog-footer"
        type="flex"
        justify="center"
        align="middle"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true,
    };
  },

  created() {},

  methods: {
    handleClose() {
      console.log(1111);
      this.dialogVisible = false;
    },
  },
};
</script>

<style scoped></style>
