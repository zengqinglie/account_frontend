<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-form :inline="true" :model="formInline" class="demo-form-inline">
				<el-form-item>
					<el-input placeholder="输入查询条件"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button>查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button @click="formVisible = true">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <!--列表-->
		<el-table
				:data="tableData"
				style="width: 100%">
			<el-table-column
					prop="name"
					label="名称"
					width="180">
			</el-table-column>
			<el-table-column
					prop="notes"
					label="说明">
			</el-table-column>
            <el-table-column
                    prop="status"
                    label="状态">
            </el-table-column>
            <el-table-column inline-template :context="_self" label="操作" width="200">
                <span>
                    <el-button type="text" size="small" @click="fetchRoleMenu(row)">分配权限</el-button>
					<el-button type="text" size="small">编辑</el-button>
					<el-button type="text" size="small">删除</el-button>
				</span>
            </el-table-column>
		</el-table>
        <!--新增页面-->
        <el-dialog title="新增" v-model="formVisible"  size="tiny">
            <el-form :model="form" ref="form" label-width="80px">
                <el-form-item label="权限名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input type="textarea" v-model="form.notes"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="formVisible = false">取 消</el-button>
                <el-button @click="onSubmit">确 定</el-button>
            </div>
        </el-dialog>

		<!--分配权限-->
		<el-dialog title="分配权限" v-model="roleFormVisible">
			<el-tree
					:data="menus"
					:props="props"
					ref="tree"
					node-key="id"
					highlight-current
					:show-checkbox="isAdmin"
					@check-change="handleCheckChange">
			</el-tree>
			<div slot="footer">
				<el-button @click="resetCheckKeys()">重 选</el-button>
				<el-button @click="updateRoleMenu()">确 定</el-button>
			</div>

		</el-dialog>


	</section>

</template>

<script>
	//TODO 控制超级管理员用户才能新增角色
	//TODO 控制管理员用户才能分配权限
	//TODO 控制超级管理员用户才能修改开发者权限
	export default {
		data() {
			return {
				isAdmin:true,
                formVisible:false,
                form:{
                    name:'',
                    notes:''
                },
				tableData: [],
				// 权限分配
				roleFormVisible:false,
				menus:[],
				checkedKey:[],
				role:{},
				props:{
					label: 'name',
					children: 'sub_menu'
				},
			}
		},
        //生命周期函数
        created () {
            // 组件创建完后
            // 加载menu 数据
            this.fetchAllRole()

        },
        methods: {
            fetchAllRole(){
                let vm =this;
                vm.$http.get("/api/roles").then((resp)=>{
                    vm.tableData=resp.data.roles;
                })
            },
			fetchRoleMenu(row){
            	var vm=this;
				vm.menus=[];
				vm.checkedKey=[];
				vm.role=row;
				vm.$http.get("/api/roles/"+vm.role.id+"/menus").then((resp)=>{
					vm.menus=resp.data.menus;
					vm.menus.forEach(
							function (menu) {
								filterChecked(menu);
							}
					);
					vm.roleFormVisible=true;
				}).then(function () {
					vm.$refs.tree.setCheckedKeys(vm.checkedKey,true);
				});
				function filterChecked(node){
					if(node.enable){
						vm.checkedKey.push(node.id)
					}
					if (node.sub_menu.length!=0){
						node.sub_menu.forEach(
								(menu)=>{
									filterChecked(menu)
								}
						)
					}
				}
			},
			resetCheckKeys(){
				let vm=this;
				vm.$refs.tree.setCheckedKeys(vm.checkedKey,true);

			},
			handleCheckChange(){

			},
            updateRoleMenu(){
				//TODO 修改后才能更新菜单,减少数据库访问
			    let vm=this;
                console.log(vm.$refs.tree.getCheckedKeys(true));
				vm.$http.post('/api/roles/'+vm.role.id+"/menus",{"checked_keys":vm.$refs.tree.getCheckedKeys(true)}).then(
						(resp)=>{
							console.log(resp)
						},(resp)=>{
							console.log(resp)
						}

				);
				vm.roleFormVisible=false;
            },
            onSubmit(){
                let vm=this;
                vm.formVisible=false;
                vm.$http.post("/api/roles",{"name":vm.form.name,"notes":vm.form.notes}).then(
                        (resp)=>{
                            console.log(resp)
                        },
                        (resp)=>{
                            console.log(resp)
                        }
                )
            }
        }
	}
</script>

<style scoped>
	.toolbar .el-form-item {
		margin-bottom: 10px;
	}

	.toolbar {
		background: #fff;
		padding: 10px 10px 0px 10px;
	}
</style>