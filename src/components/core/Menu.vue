<template>
    <el-row :gutter="20">
        <el-col :span="12">
            <!--左侧树菜单-->
            <el-tree
                    :data="menuApp"
                    :props="props"
                    @check-change="handleCheckChange" @node-click="handleNodeClick">
            </el-tree>
        </el-col>
        <!--右侧展示区-->
        <el-col :span="12">
            <div>ss2</div>
            <el-button type="text" @click="editFormVisible = true">新增</el-button>
        </el-col>

        <!--新增menu node-->
        <el-dialog title="新增菜单" v-model="editFormVisible">
            <el-form label-width="100px">
                <el-form-item label="类型:">
                    <el-radio-group v-model="menuNode.level">
                        <el-radio :label="1">应用</el-radio>
                        <el-radio :label="2">模块</el-radio>
                        <el-radio :label="3">菜单</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <!--新增应用-->
            <el-form label-width="100px" ref="menuNodeForm" :model="menuNode" :rules="rules" v-if="menuNode.level===1">
                <el-form-item label="应用名:" prop="name">
                    <el-input v-model="menuNode.name"></el-input>
                </el-form-item>
                <el-form-item label="路径:" prop="path">
                    <el-input v-model="menuNode.path"></el-input>
                </el-form-item>
            </el-form>
            <!--新增模块-->
            <el-form label-width="100px" ref="menuNodeForm" :model="menuNode" :rules="rules" v-if="menuNode.level===2">
                <el-form-item label="应用:">
                    <el-select v-model="menuNode.parent" placeholder="请选择">
                        <el-option
                                v-for="item in menuApp"
                                :label="item.name" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="模块名:" prop="name">
                    <el-input v-model="menuNode.name"></el-input>
                </el-form-item>
                <el-form-item label="叶子节点:">
                    <el-switch
                            v-model="menuNode.leaf"
                            on-color="#13ce66"
                            off-color="#ff4949">
                    </el-switch>
                </el-form-item>
                <el-form-item label="图标:" v-if="menuNode.leaf">
                    <el-input v-model="menuNode.icon" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="路径:" prop="path" v-if="menuNode.leaf">
                    <el-col :span="6">
                        <el-input v-model="menuNode.parent.path" :disabled="true"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="menuNode.path"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <!--新增菜单-->
            <el-form label-width="100px" ref="menuNodeForm" :model="menuNode" :rules="rules" v-if="menuNode.level===3">
                <el-form-item label="应用:">
                    <el-select v-model="nodeApp" placeholder="请选择所属应用" @change="handleNodeAppchange">
                        <el-option v-for="item in menuApp"
                                   :label="item.name" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="导航栏:">
                    <el-select v-model="menuNode.parent" placeholder="请选择导航栏">
                        <el-option
                                v-for="item in subMenu"
                                :label="item.name" :value="item"
                                :disabled="item.leaf"></el-option>
                    </el-select>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单名:" prop="name">
                    <el-input v-model="menuNode.name"></el-input>
                </el-form-item>
                <el-form-item label="图标:">
                    <el-input v-model="menuNode.icon" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="路径:" prop="path">
                    <el-col :span="6">
                        <el-input v-model="nodeApp.path" :disabled="true"></el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-input v-model="menuNode.path"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="onSubmit('menuNodeForm')">创 建</el-button>
                <el-button @click.native="resetForm('menuNodeForm')">取 消</el-button>
            </div>
        </el-dialog>
    </el-row>

</template>

<script>
    export default {
        data() {
            return {
                editFormVisible: false,
                menuNode: {
                    name: '',
                    path: '',
                    parent: '',
                    level: 3,
                    leaf: false,
                    icon: 'fa fa-bar-chart',
                },
                rules: {
                    name: [
                        { required: true, message: '该字段不能为空哦', trigger: 'blur' },
                    ],
                    path: [
                        { required: true, message: '该字段不能为空', trigger: 'blur' },
                    ]
                },
                nodeApp: '',

                menuApp: [],
                subMenu: [],
                props: {
                    label: 'name',
                    children: 'sub_menu'
                }
            };
        },
        //生命周期函数
        created () {
            // 组件创建完后
            // 加载menu 数据
            this.fetchMenuApp()

        },
        watch:{
          "menuNode.level":function (nv,ov) {
              var vm=this;
              vm.menuNode.name='';
              vm.menuNode.path='';
              vm.menuNode.leaf=false;

         },
            "menuNode.leaf":function (nv,ov) {
                var vm=this;
                vm.menuNode.path='';
            }
        },
        methods: {
            //加载menu数据
            fetchMenuApp(){
                var vm = this;
                vm.$http.get('/api/menu?level=1').then(
                        (resp)=> {
                            vm.menuApp = resp.data.menus;
                        }
                )
            },
            // 转换应用的子菜单
            handleNodeAppchange(current){
                this.menuNode.parent = '';
                this.subMenu = current.sub_menu;
            },
            handleCheckChange(data, checked, indeterminate) {
                //TODO 菜单编辑
                //console.log(data, checked, indeterminate);
            },
            handleNodeClick(data, node, tree) {
                //TODO 菜单编辑
                //console.log(data);
            },
            // 新增菜单
            onSubmit(formName){

                var vm = this;
                vm.$refs[formName].validate((valid)=>{
                    if(valid){
                        console.log('valid')
                        vm.$http.post('/api/menu',
                                {
                                    name: vm.menuNode.name,
                                    path: vm.menuNode.path,
                                    level: vm.menuNode.level,
                                    parent_id: vm.menuNode.parent.id,
                                    icon: vm.menuNode.icon,
                                    leaf: vm.menuNode.leaf,
                                })
                                .then((resp)=> {
                                    console.log(resp)
                                    vm.fetchMenuApp()
                                }, (resp)=> {
                                    console.log("error")
                                });
                        vm.editFormVisible = false;
                        this.$refs[formName].resetFields();
                    }else{
                        console.log('not valid');
                        return false
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.editFormVisible=false;
            }

        }
    }
</script>