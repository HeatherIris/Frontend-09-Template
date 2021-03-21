function kmp (source, pattern) {
    // 计算表格
    let table = new Array(pattern.length).fill(0);
    {
        let i = 1,  // 未重复
        j = 0;   // 已重复

        while (i < pattern.length) {

            // 相互匹配
            if (pattern[i] == pattern[j]) {
                ++j, ++i
                table[i] == j;
            }else {
                if (j > 0) {
                    j = table[j];
                } else {
                    table[i] = j;
                    ++i;
                }  
            }
        }        
    }

    {
        let i = 0; j = 0;
        while(i < source.length) {
            if (pattern[j] === source[i]) {
                ++i, ++j;
            }else {
                if (j > 0) {
                    j = table[j];
                } else {
                    ++i;
                } 
            }
            // 模式串匹配到头结束
            if (j === pattern.length) {
                return true
            }
        }
        return false;
    }


    // 匹配
}

kmp("hello", "ll")