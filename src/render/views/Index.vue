<template>
  <el-table
    :data="tableData"
    style="width: 100%; max-height=250"
    :stripe="true"
  >
    <el-table-column prop="date" fixed label="日期" width="140">
      <template #default="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
    <el-table-column prop="address" label="地址">
      <template #default="scope">
        <i class="el-icon-location-information" />
        <span style="margin-left: 10px">{{ scope.row.address }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
          <i class="el-icon-edit" /> 编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          <i class="el-icon-document-delete" /> 删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "Index",
  data() {
    const item = {
      date: "2020-12-07",
      name: "舒舞影",
      address: "无锡市滨湖区xx小区xx-1703",
    };
    return {
      tableData: Array(20).fill(item),
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
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
