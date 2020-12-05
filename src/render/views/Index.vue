<template>
  <el-table :data="tableData">
    <el-table-column prop="date" label="日期" width="140"> </el-table-column>
    <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
    <el-table-column prop="address" label="地址"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Index",
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    };
    return {
      tableData: Array(20).fill(item),
    };
  },
};
</script>

<style lang="scss" scoped>
.logo-box {
  width: 20%;
  margin-left: 130px;
}
.success {
  background: #00c13c;
  border: none;
  border-radius: 10px;
  padding: 10px 80px;
  color: #fff;
  text-decoration: none;
}
</style>
