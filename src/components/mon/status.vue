<template>
	<el-row>
		<el-col :span="6">
			<el-input v-model="input" placeholder="输入过滤"></el-input>
			<el-tree
					:data="cmdb"
					:props="defaultProps"
					:filter-node-method="filterNode"
					ref="tree"
					@node-click="handleNodeClick"></el-tree>
		</el-col>
		<el-col :span="18">
			<div>
				<el-table :data="tableData" style="width:100%">
					<el-table-column prop="ip" label="IP" width="180"></el-table-column>
					<el-table-column prop="name" label="主机名" width="180"></el-table-column>
				</el-table>
			</div>
		</el-col>
	</el-row>

</template>
	<script>
		import _ from 'lodash'
		export default {
			data() {
				return {
					cmdb: [],
					prods:[],
					input:'',
					defaultProps: {
						label: 'name',
						children: 'children',

					},
					tableData: []
				};
			},
			created () {
				// 组件创建完后
				this.fetchCmdbTree()

			},
			watch:{
				input:function (filter) {
					this.filterTree(filter)
				}
			},
			methods: {
				fetchCmdbTree(){
					var vm=this;
					vm.$http.get('/api/mon/products').then((resp)=>{
						vm.cmdb=resp.data.prods;
					})
				},
				handleNodeClick(data,node,tree) {
					var vm=this;
					vm.tableData=[];
					if(node.level===3){
						vm.$http.get("/api/cmdb/clusters/"+node.data.id+"/instances").then((resp)=>{
							vm.tableData=resp.data.instances;
						},(resp)=>{
							console.log("error");
						});
					}
				},
				filterNode(value,data,node){
					if(node.level===3){
						let parent=node.parent;
						let grandfather=parent.parent;
						return node.data.name.indexOf(value)>-1||
								parent.data.name.indexOf(value)>-1||
									grandfather.data.name.indexOf(value)>-1
					}
				},
				filterTree:_.debounce(function (filter) {
						var vm=this;
						vm.$refs.tree.filter(filter)
				},500)
			}
		};
</script>