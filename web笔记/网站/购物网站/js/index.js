$(function(){
  $('#fullpage').fullpage({
    verticalCentered: false,
    navigation: true,
    afterLoad: function (linkName, index) {
        if(index == 2){
          $(".s2_search_img").animate({
              left:"42%",
              opacity:1
          },600,"easeOutBack",function(){
          $(".s2_search_text").fadeIn(600,function(){
            $(".s2_search_img,.s2_search_text").hide();
            $(".s2_search_all").show().animate({
                  left:'60%',
                  top:'24.5%',
                  width:170
            },600);
            $(".s2_sfAll").animate({
                left:"50%",
                bottom:210,
                width:441,
                opacity:1
            },600,"easeInOutQuart");
            $('.s2_text1').fadeOut(600);
            $('.s2_text2').fadeIn(600);
          });
        });
      }
    },onLeave:function(index,nextIndex,direction){
      if(index==2 && nextIndex==3){
        $('.s2_sf_bg').show();
        $(".s3_sf").show().animate({
          width:207,
          bottom:"40%",
          left:"37%"
        },2000,function(){
          $('.s3_check1,.s3_buy1').fadeOut(300);
          $('.s3_check2,.s3_buy2').fadeIn(300);
        });
      }
      if(index==3 && nextIndex==4){
        $('.s3_sf').hide();
        $('.s4_sf').show().animate({
          bottom:"46%",
          left:"50%"
        },1000,function(){
          var run=$(window).width()-$('.s4_car').offset().left;
          $(".s4_sf_all").animate({
           left:run
          },2000,"easeInElastic",function(){
            $('.s4_sh,.s4_shlan').fadeIn(300);
            $('.s4_text2').fadeIn(300);
            $('.s4_text1').fadeOut(300);
          });
        })
      }
      if(index==4 && nextIndex==5){
        $('.s5_hand1').animate({
          bottom:"-4%",
        },1000,function(){
          $('.s5_mouse2').fadeIn(200,function(){
            $(".s5_sf").animate({
              bottom: "10%"
            },1000,function(){
                  $(".s5_order").animate({
                      bottom:"62%"
                  },500,function(){
                      // $(".s5_text").fadeIn(200,function(){
                      //   $(".s5_text").animate({
                      //     width:725
                      //   },1000)
                      // });
                      $(".s5_text").addClass('s5_st');
                  })
            });
          })
        });
      }
      if(index==5 && nextIndex==6){
        $(".s5_sf").hide();
        $(".s6_sf").show().animate({
          bottom:"66%",
          left:"38%",
          width:64
        },1000,function(){
          $('.s6_sf').hide();
          $('.s6_box').animate({
            bottom:12
          },1000,function(){
            $('.s6_box,.s6_sf,.s6_car').css({'z-index':0});
            $('.s6_text').fadeIn(300,function(){
                $(this).animate({left:"25%"},1000)
            });
            $(".s6_dir").show();
            $(".six").animate({
              backgroundPositionX:"100%"
            },1000,function(){
              $(".s6_man").animate({
                left: "28%",
                bottom: "17%",
                width:252
              },1000,function(){
                $(".s6_man").animate({
                  left:"39%"
                },800,function(){
                    $(".s6_door").show();
                    $(".s6_women").show().animate({
                      right: "29%",
                      bottom: "18%",
                      width: 87
                    },1000,function(){
                      $(".s6_sh").fadeIn(600);
                    })
                  
                })
              })
            })
          });
        });
      }
      if(index==6 && nextIndex==7){
        $(".s7_star").animate({'width':100},2000,function(){
          $(".s7_good").fadeIn(100);
        })
      }

        $(document).on('mousemove',function(e){
          var x=e.pageX-58;
          var y=e.pageY+10;
          // var x=e.clientX-58;
          // var y=e.clientY+10;
          var Y=$(window).height();
                if(Y-y>449){
                  y=$(window).height()-449
                }
            $(".s8_hand").css({
              'left':x,
              'top':y
            })
            console.log(e.clientY);
        });
        $(".s8_btn1").hover(function(){
          $(".s8_btn2").toggle();
        })
        $(".s8_again").on("click",function(){
            $.fn.fullpage.moveTo(1);
            $("img,.move").attr('style','');
            $(".six").css({'background-positionX':"25%"})
        })
      
    }
      
    
  });
});