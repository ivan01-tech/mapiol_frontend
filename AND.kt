package com.example.cc_inf355_kotlin

class Rationnal(var num: Int, var den: Int) {

    fun add(rat: Rationnal): Rationnal {
        var somRat = Rationnal(1, 1)
        somRat.num = num * rat.den + rat.num * this.den
        somRat.den = rat.den * this.den

        return somRat
    }

    fun sus(rat: Rationnal): Rationnal {
        var somRat = Rationnal(1, 1)
        somRat.num = num * rat.den - rat.num * this.den
        somRat.den = rat.den * this.den

        return somRat
    }


    fun mul(rat: Rationnal): Rationnal {
        var somRat = Rationnal(1, 1)
        somRat.num = num * rat.num
        somRat.den = rat.den * this.den

        return somRat
    }

    fun div(rat: Rationnal): Rationnal {
        var somRat = Rationnal(1, 1)
        somRat.num = num * rat.den
        somRat.den = rat.num * this.den

        return somRat
    }

    override fun toString(): String {

        return "$num / $den"
    }
}

fun compare2Rationnal(ratio1: Rationnal, ration2: Rationnal): Int {
    /* if (ratio1.den == ration2.den) {
         if (ratio1.num == ration2.num) return 0
         else if (ratio1.num > ration2.num) return 1
         else return -1
     }else if(ratio1.den > ration2.den){
         if (ratio1.num == ration2.num) return 0
         else if (ratio1.num > ration2.num) return 1
         else return -1
     } else{
         return 1
     }*/

    val ratio = ratio1.div(ration2)
    if (ratio.den == ratio.num) {
        return 0
    } else if (ratio.den > ratio.num) {
        return -1
    } else return 1
}

fun main() {
    var troisQuart = Rationnal(3, 4)
    var unSurHuit = Rationnal(1, 8)

    println(troisQuart.toString())
    println(unSurHuit.toString())

    val som = troisQuart.add(unSurHuit)
    println(som.toString())

    val mul = troisQuart.mul(unSurHuit)
    println(mul.toString())

    val tableauRationnels = arrayOf(
        Rationnal(1, 2),
        Rationnal(3, 4),
        Rationnal(5, 6),
        Rationnal(7, 8),
        Rationnal(9, 10),
        Rationnal(11, 12)
    )

    val minRta = getMinRational(tableauRationnels)
    println(minRta.toString())

}

fun getMinRational(tab: Array<Rationnal>): Rationnal {
    var temp: Rationnal = tab[0]
    for (rat in 1..tab.size - 1) {
        if (compare2Rationnal(temp, tab[rat]) == 1) {
            temp = tab[rat]
        }
    }

    return temp
}