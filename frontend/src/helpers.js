function getRangefromValue(data){

          if(data.value < data.Marker.below_standard_lower){
            return "BELOW SCALE";
          } else if(data.value > data.Marker.below_standard_lower && data.value < data.Marker.below_standard_upper){
              return "BELOW STANDARD";
          } else if (data.value > data.Marker.below_standard_upper && data.value < data.Marker.optimal_lower){
              return "BELOW OPTIMAL"
          } else if (data.value > data.Marker.optimal_lower && data.value < data.Marker.optimal_upper){
              return "OPTIMAL"
          } else if (data.value > data.Marker.optimal_upper && data.value < data.Marker.above_standard_lower){
              return "ABOVE OPTIMAL"
          } else if (data.value > data.Marker.above_standard_lower && data.value < data.Marker.above_standard_upper){
              return "ABOVE STANDARD"
          } else if (data.value > data.Marker.above_standard_upper){
              return "ABOVE SCALE"
          } else {
              return "JUNK DATA"
          }
    }

    export {getRangefromValue};