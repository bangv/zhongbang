<template>
    <div>
        导出
        <button @click="exportXLSX">export me</button>
        <p>https://github.com/SheetJS/js-xlsx/tree/master/demos/vue</p>
        <p>sheetJs</p>
    </div>
</template>

<script>
    import xlsx from 'xlsx'
    export default {
        data() {
            return {
                wb: ''
            }
        },
        created() {
            console.log('created')
            this.wb = xlsx.utils.book_new()
        },
        methods: {
            exportXLSX () {
                console.log('hi')
                console.log('xlsx:', xlsx)
                let new_ws_name = "SheetJS";

                let start = {c: 0, r: 0}, end = {c: 0, r: 0}//c合并行 r:合并列 默认应该是0000
                let range = {s: start, e: end}

                let ws_data = [
                    [ "S", "h", "e", "e", "t", "J", "S" ],
                    [  1 ,  2 ,  3 ,  4 ,  5 ]
                ];
                let ws = xlsx.utils.aoa_to_sheet(ws_data);
                ws['!merges'] = [range];

                xlsx.utils.book_append_sheet(this.wb, ws, new_ws_name);

                xlsx.writeFile(this.wb, 'out.xlsx');
            }
        }
    }
</script>

<style scoped>

</style>