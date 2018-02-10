
              api.getCompanys(10,1).then((response) => {
                if(response){
                  api.getCompanys(Math.round(response.data.pages*10),1).then((response) => {
                    if(response){
                      this.$store.dispatch('Companys', response.data.items);
                    }
                  });
                }
              });
/*              api.getClasss(10,1).then((response) => {
                if(response){
                  api.getClasss(Math.round(response.data.pages*10),1).then((response) => {
                    if(response){
                      var classs=[];
                      response.data.items.forEach(function(v,k){
                        classs.push({
                          id:v.id,
                          class_name:v.class_name
                        })
                      });
                      this.$store.dispatch('Classs', classs);
                    }
                  });
                }
              });*/
              api.getProds(10,1).then((response) => {
                if(response){
                  api.getProds(Math.round(response.data.pages*10),1).then((response) => {
                    if(response){
                      var prods=[];
                      response.data.items.forEach(function(v,k){
                        prods.push({
                          id:v.id,
                          prod_name:v.prod_name
                        })
                      });
                      this.$store.dispatch('Prods', prods);
                    }
                  });
                }
              });
/*    api.getPeriods(10,1).then((response) => {
      if(response){
        api.getPeriods(response.data.total,1).then((response) => {
          if(response){
            const periods=[];
            response.data.items.forEach(function(v,k){
              periods.push({
                v.id,
                v.class_name
              })
            });
            this.$store.dispatch('Periods', periods);
          }
        });
      }
    });*/
    
    api.getClasss(10,1).then((response) => {
      if(response){
        api.getClasss(Math.round(response.data.pages*10),1).then((response) => {
          if(response){
            var classs=[];
            response.data.items.forEach(function(v,k){
              classs.push({
                id:v.id,
                class_name:v.class_name
              })
            });
            this.$store.dispatch('Claarr', classs);
          }
        });
      }
    });