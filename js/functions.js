$(function(){
    var currentValue = 0
    var isDrag = false
    var preco_maximo = 30000
    var preco_atual = 0 

    $('.pointer-barra').mousedown(function(){
        isDrag = true
    })

    $(document).mouseup(function(){
        isDrag = false
        enableTextSelect()
    })

    $('.barra-preco').mousemove(function(e){
        if(isDrag){
            disableTextSelection()
            var elBase = $(this)
            var mouseX = e.pageX - elBase.offset().left
            if(mouseX < 0){
                mouseX = 0
            }
            if(mouseX > elBase.width())
                mouseX = elBase.width()
        
            $('.pointer-barra').css('left',(mouseX-13)+'px')
           currentValue = (mouseX / elBase.width()) * 100
            $('.barra-preco-fill').css('width',currentValue+'%')
            // Ajustar o formato do preço.
            preco_atual = (currentValue/100) * preco_maximo
            preco_atual = formatarPreco(preco_atual)
            $('.preco_pesquisa').html('RS'+preco_atual)

        }
    }) 

    function formatarPreco(preco_atual){
        preco_atual = preco_atual.toFixed(2)
        preco_arr = preco_atual.split('.')

        var novo_preco = formatarTotal(preco_arr)

        return novo_preco
    }

    function formatarTotal(preco_arr){
        if(preco_arr[0] < 1000){
            return preco_arr[0]+','+preco_arr[1]
        }else if(preco_arr[0] < 10000){
            return preco_arr[0][0]+'.'+preco_arr[0].substr(1,preco_arr[0].length)+
            ','+preco_arr[1]
        }else{
            return preco_arr[0][0]+preco_arr[0][1]+'.'+preco_arr[0].substr(2,preco_arr[0].length)+
            ','+preco_arr[1]
        }
    }

    function enableTextSelect(){
        $('body').css('-webkit-user-select','auto')
        $('body').css('-moz-user-select','auto')
        $('body').css('-o-user-select','auto')
        $('body').css('-ms-user-select','auto')
        $('body').css('user-select','auto')
    }

    function disableTextSelection(){
        $('body').css('-webkit-user-select','none')
        $('body').css('-moz-user-select','none')
        $('body').css('-o-user-select','none')
        $('body').css('-ms-user-select','none')
        $('body').css('user-select','none')
    }

    /* Menu Responsivo */

    $('.mobile').click(function(){
        $(this).find('ul').slideToggle()
    })

    // Sistema de navegação dos depoimentos index.html


    var amtDepoimento = $('.depoimento-single p').length
    var curIndex = 0


    iniciarDepoimentos()
    navegarDepoimentos()

    function iniciarDepoimentos(){
        $('.depoimento-single p').hide()
        $('.depoimento-single p').eq(0).show()
    }

    function navegarDepoimentos(){
    $('[next]').click(function(){
            curIndex++
            if( curIndex >= amtDepoimento)
            curIndex = 0
            $('.depoimento-single p').hide()
            $('.depoimento-single p').eq(curIndex).show()
    })

    $('[prev]').click(function(){
        curIndex--
        if( curIndex < 0)
        curIndex = amtDepoimento-1
        $('.depoimento-single p').hide()
        $('.depoimento-single p').eq(curIndex).show()
    })
    }
})