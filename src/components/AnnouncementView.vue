<template>
    <div style="text-align: center">
        <v-timeline align="start">
            <v-timeline-item
                    v-for="(item, i) in items"
                    :key="i"
                    :dot-color="'indigo-lighten-1'"
                    :icon="'mdi-buffer'"
                    fill-dot
                    style="width: 37%"
            >
                <template v-slot:opposite>
                    <p>{{item.time}}</p>
                </template>
                <v-card style="width: 480px">
                    <v-card-text>
                        <p style="width: 100%">{{item.groupInfo}}</p>
                        <v-btn
                                :color="'indigo-lighten-1'"
                                variant="outlined"
                                style="margin-top: 30px"
                        >
                            点击查看成员信息
                        </v-btn>
                        <v-btn
                                :color="'red-lighten-1'"
                                variant="outlined"
                                style="margin-left: 30%; margin-top: 30px"
                        >
                            修改
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-timeline-item>
        </v-timeline>
    </div>
</template>

<script>
    import API from "../axios.js"


    export default {
        name: "AnnouncementView",
        data: () => {
            return {
                items: [
                    {
                        color: 'red-lighten-2',
                        icon: 'mdi-star',
                        time: '时期一',
                        groupInfo: 'A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123',
                        id: '1'
                    },
                    {
                        color: 'purple-lighten-2',
                        icon: 'mdi-book-variant',
                        time: '时期二',
                        groupInfo: 'A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123',
                        id: '2'
                    },
                    {
                        color: 'green-lighten-1',
                        icon: 'mdi-airballoon',
                        time: '时期三',
                        groupInfo: 'A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123A123B123C123D123',
                        id: '3'
                    },
                ],
            }
        },
        methods:{
            getInfo(){
                console.log(this.items)
                API.post(API.defaults.baseUrl + '/announcement/announcement/all/')
                    .then(function (response) {
                        if (response.data.code === 200) {
                            while (!(this.items.length === 0)) {
                                this.items.pop();
                            }
                            let i;
                            for (i = 0; i < response.data.data.length; i++) {
                                this.items.push(response.data.data[i])
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        created:function () {
            this.getInfo()
        }
    }
</script>