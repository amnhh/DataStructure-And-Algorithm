/**
 * @title 位运算
 *
 * @index 2
 *
 * @trainOfThought
 * 两两得0
 *
 * @complexAnalysis 复杂度分析
 * O(n)
 *
 * @type 位运算
 *
 * @note 笔记
 *
 * @category 位运算巧用
 *
 * @score 时间、内存消耗得分
 * 执行用时击败 62.10%，内存消耗击败 30.00%
 */

export default function ReorderSolution (nums: Array<number>): number {
    let ret = nums.length
    for (let i = 0; i < nums.length; i ++) {
        ret ^= i ^ nums[i]
    }
    return ret
}
