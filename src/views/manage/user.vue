<template>
    <frame-component>
        <div id="main" class="userManage">
            <div class="contentBox">
                <div class="location"><span>用户管理</span><span class="split">></span><span>用户信息</span></div>

                <div class="dataTable">
                    <el-table :data="userList">
                        <el-table-column  prop="userName" label="用户名"></el-table-column>
                        <el-table-column prop="company" label="所属单位"></el-table-column>
                        <el-table-column prop="email" label="邮箱"></el-table-column>
                        <el-table-column  prop="phone" label="联系方式"></el-table-column>
                        <el-table-column prop="roleName" label="管理角色"></el-table-column>
                        <el-table-column inline-template :context="_self"  label="操作" width="300">
                            <span class="operateCon">
                                <el-button type="text" size="small" @click="deleteUserHandle($index, row)">删除</el-button>
                            </span>
                        </el-table-column>
                    </el-table>
                </div>

                <div class="dataPage">
                    <el-pagination
                     @current-change="currentUserChangeHandle"
                     @size-change="handleSizeChange"
                     :current-page="pageNo"
                     :page-size="pageSize"
                     :page-sizes="[5,10, 15, 20]"
                     layout="total, sizes, prev, pager, next"
                     :total="total"/>
                </div>
            </div>
        </div>
    </frame-component>
</template>

<script>
    import FrameComponent from '../../components/frame.vue';
    import { mapActions, mapState } from 'vuex';

    export default {
        components:{
            FrameComponent
        },
        data(){
            return{
                pageSearchTxt:'',
            }
        },
        computed: mapState({
            userId: state => state.user.user.id,
            pageNo: state => state.manageUser.pageNo,
            pageSize: state => state.manageUser.pageSize,
            searchTxt: state => state.manageUser.searchTxt,
            total: state => state.manageUser.total,
            userList: state => state.manageUser.userList
        }),
        methods: {
            ...mapActions({
                getListUser: 'getListUser',
                delUser: 'delUser',
            }),
            initPage(){
                this.getListUser({
                    userId: this.userId,
                    searchTxt: this.searchTxt || '',
                    pageNo: this.pageNo || 1,
                    pageSize: this.pageSize
                });
            },
            deleteUserHandle($index, row) {
                const self = this;
                const userId = row.userId;
                const usrName = row.userName
                self.$confirm('此操作将删除'+ usrName +', 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    self.delUser(userId).then(()=>{
                        this.$message.success('删除成功!');
                        self.initPage();
                    },(message)=>{
                        this.$message.error(message);
                    })
                }).catch(() => {
                    this.$message.info('已取消删除');
                });
            },
            currentUserChangeHandle(val) {
                this.setPageNoUser(val);
                this.initPage();
            },
            handleSizeChange(val){
                this.setPageSizeUser(val)
                this.initPage();
            },
        },
        mounted(){
            this.initPage();
        }
  }
</script>