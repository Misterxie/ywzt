<template>
    <div style="width:100%;height:100%;">
        <Card>
            <div slot="title" class="card-title" >
                <div class="table-item-head" style="position:relative;">
                    <table >
                        <thead>
                        <tr>
                            <th style="width:15%">节点名称</th>
                            <th style="width:20%">节点编号</th>
                            <th style="width:25%">节点总空间</th>
                            <th style="width:30%">节点已用空间</th>
                            <th style="width:10%">状态</th>
                        </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div class="data-source-row">
                <div class="table-container-list scrollbar-thumb" style="height:100%">
                    <table class="table-container-list" style="height:100%">
                        <tbody style="vertical-align: top">
                        <tr
                                class="item-tr"
                                v-for="(item, index) in nodesTableList"
                                :key="index"
                        >
                            <td >{{item.node_name}}</td>
                            <td>{{item.node_id}}</td>
                            <td>{{item.total_size}}</td>
                            <td>{{item.use_size}}</td>
                            <td>{{item.node_status}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>
    import Util from '@/libs/util.js';
export default {
    name: "nodeDetailList",
    data () {
        return {
            nodesTableList: [
                // {
                //     ard_exption_num: null,
                //     card_num: null,
                //     connect_num: "5",
                //     cpu_usage: "50",
                //     createdate: "2019-10-15 09:10:46",
                //     creator: "haha",
                //     current_baddisk: null,
                //     disk_num: null,
                //     fan_status: "100",
                //     history_baddisk: null,
                //     history_baddisk_rate: "0",
                //     ip: "192.167.0.0",
                //     is_copy: null,
                //     is_delete_code: null,
                //     memory_left: "100",
                //     memory_use: "100",
                //     node_id: "1",
                //     node_name: "node1",
                //     node_status: "1",
                //     node_type: null,
                //     power_status: "100",
                //     protocol_type: null,
                //     raid: "raid1",
                //     read_rate: "1000",
                //     recv_rate: "1000",
                //     run_time: "10000",
                //     send_rate: "1000",
                //     slot_num: null,
                //     ssd_waer_status: "2",
                //     start_time: "2019-10-15 09:07:23",
                //     store_area_id: "store1",
                //     store_usage: "50",
                //     systemdisk_usage: "20",
                //     total_size: "20",
                //     use_size: "10",
                //     wait: "1000",
                //     write_rate: "1000"
                // }
            ]
        }
    },
    methods: {
        getNodesList () {
            Util.ajaxMethod('GET', '/api/cscpNode/search').then((res) => {
                this.nodesTableList = res.data;
            })

        }
    },
    mounted() {
        this.getNodesList();
    }
}
</script>

<style scoped lang="less">

    /*.table-item{*/
        /*width:100%;*/
        /*!*height:0.85rem;*!*/
        /*height:100%;*/
          /*!*height:calc(17% - 18px);*!*/
        .table-item-head{
              width:100%;
              height:24px;
              line-height:24px;
              box-sizing: border-box;
              background-size:100% 100%;
                table {
                    width: 100%;
                    border-collapse: collapse;
                    table-layout: fixed;
                    font-size:12px;
                }
                th {
                    color:#000;
                    /*border-top: 1px solid #02384b;*/
                    /*padding: 6px 0;*/
                    font-size:12px;
                }
        }
        .table-container-list{
            width: 100%;
            flex: 1;
            box-sizing: border-box;
            overflow-y: auto;
            border-collapse: collapse;
            tr{
                height:35px;
                line-height:35px;
                /*border-bottom: 1px solid #000;*/
            }
            td {
                /*font-size: 0.12rem;*/
                color: #000;
                padding: 5px 0;
                text-align:center;
                word-break:break-all;
            }
            .item-tr td:nth-child(1) {
                width: 15%;
            }
            .item-tr td:nth-child(2) {
                width: 20%;
            }
            .item-tr td:nth-child(3) {
                width: 30%;
            }
            .item-tr td:nth-child(4) {
                width: 35%;
            }

        }
    //}
    .scrollbar-thumb {
        &::-webkit-scrollbar {
            width: 5px;
            height: 10px;

        }

        // 滚动条滑块
        &::-webkit-scrollbar-thumb {
            border-radius: 0.02rem;
            // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background-color: #4693EC;
            //background-color:#fff;
        }

        // 滚动条轨道
        &::-webkit-scrollbar-track {
            // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 0.02rem;
            background-color: #ccc;
        }
    }

</style>