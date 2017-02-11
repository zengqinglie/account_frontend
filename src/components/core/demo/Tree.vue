<template>
    <div>
        <!-- see also https://github.com/ElemeFE/element/issues/1236; http://jsfiddle.net/8wo0sm4w/-->
        <el-tree lazy
                 show-checkbox
                 default-expand-all1
                 node-key="id"
                 check-strictly1
                 :default-expanded-keys="defaultExpandedKeys"
                 :load="loadNode"
                 highlight-current
                 :default-checked-keys="defaultCheckedKeys"
                 :props="{ label: 'id' }">
        </el-tree>

        <el-button @click="enableData">EnableData</el-button>
        <el-button @click="setCheckedNodes">setCheckedNodes</el-button>

        <el-tree :data="data"
                 ref="tree"
                 :props="defaultProps"
                 show-checkbox
                 node-key="id"
                 :auto-expand-parent="true"
                 @check-change="handleCatalogChkChange"
                 default-expand-all
                 check-strictly
                 :default-checked-keys="defaultCheckedKeys"
                 :default-expanded-keys="defaultExpandedKeys"></el-tree>
    </div>
</template>

<style scoped>
</style>

<script type="text/ecmascript-6">
    const data = [{
        id: 1,
        label: 'Level one 1',
        children: [{
            id: 11,
            label: 'Level two 1-1',
            children: [{
                id: 111,
                label: 'Level two 1-1-1'
            }, {
                id: 112,
                label: 'Level two 1-1-2'
            }]
        }]
    }, {
        id: 2,
        label: 'Level one 2',
        children: [{
            id: 21,
            label: 'Level two 2-1'
        }, {
            id: 22,
            label: 'Level two 2-2'
        }]
    }, {
        id: 3,
        label: 'Level one 3',
        children: [{
            id: 31,
            label: 'Level two 3-1'
        }, {
            id: 32,
            label: 'Level two 3-2'
        }]
    }];

    let count = 1;

    export default {
        methods: {
            handleCatalogChkChange(data, checked, indeterminate) {
                console.info(this.$refs.tree.getCheckedNodes())
            },
            loadNode(node, resolve) {
                if (node.level === 0) {
                    return resolve([{ id: 1, name: 'Root1' }, { id: 2, name: 'Root2' }]);
                }

                if (node.level > 4) return resolve([]);

                let hasChild;
                if (node.data.name === 'Root1') {
                    hasChild = true;
                } else if (node.data.name === 'Root2') {
                    hasChild = false;
                } else {
                    hasChild = Math.random() > 0.5;
                }

                setTimeout(function() {
                    let data;
                    if (hasChild) {
                        data = [{
                            id: node.key * 10 + 1,
                            name: 'zone' + count++
                        }, {
                            id: node.key * 10 + 2,
                            name: 'zone' + count++
                        }];
                    } else {
                        data = [];
                    }

                    resolve(data);
                }, 100);
            },

            enableData() {
                this.data = data;
            },

            setCheckedNodes() {
                this.$refs.tree.setCheckedNodes(
                        [
                            {
                                "id": 111,
                                "label": "Level two 1-1-1"
                            },
                            {
                                "id": 112,
                                "label": "Level two 1-1-2"
                            },
                            {
                                "id": 11,
                                "label": "Level two 1-1"
                            }
                        ]
                );
            }
        },

        data() {
            return {
                defaultCheckedKeys: [],
                defaultExpandedKeys: [],
                data: null,
                defaultProps: {
                    key: 'id',
                    children: 'children',
                    label: 'label'
                }
            };
        }
    };
</script>