package com.projects.payrollmanagementsystem.specifications;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.jpa.domain.Specification;
import java.util.List;

@Data
@AllArgsConstructor
public abstract class BasicSpecificationBuilder {
    private  final List<SearchCriteria> params;
    private String search;

    public BasicSpecificationBuilder with(String key, String operation, String value, String prefix, String suffix){
        SearchOperation searchOperation = SearchOperation.getSimpleOperation(operation.charAt(0));
        if(searchOperation!=null){
            if(searchOperation == SearchOperation.EQUALITY) {
                boolean endsWithAsterisk = prefix.contains("*");
                boolean startsWithAsterisk = suffix.contains("*");
                if (endsWithAsterisk && startsWithAsterisk) {
                    searchOperation = SearchOperation.CONTAINS;
                }
                else if(startsWithAsterisk){
                    searchOperation = SearchOperation.STARTS_WITH;
                }
                else if (endsWithAsterisk) {
                    searchOperation = SearchOperation.ENDS_WITH;
                }
            }
            else if(searchOperation == SearchOperation.CONTAINS){
                searchOperation = SearchOperation.CONTAINS;
            }
            else if(searchOperation == SearchOperation.NOT_IN){
                searchOperation = SearchOperation.NOT_IN;
            }
            else if(searchOperation == SearchOperation.INNER_JOIN){
                searchOperation = SearchOperation.INNER_JOIN;
            }
            else if(searchOperation == SearchOperation.LEFT_JOIN){
                searchOperation = SearchOperation.LEFT_JOIN;
            }
            else if(searchOperation == SearchOperation.RIGHT_JOIN){
                searchOperation = SearchOperation.RIGHT_JOIN;
            }
            else if(searchOperation == SearchOperation.FULL_JOIN){
                searchOperation = SearchOperation.FULL_JOIN;
            }
            params.add(new SearchCriteria(key, searchOperation, value));
        }
        System.out.println(this.getParams());
        return this;

    }

     public abstract Specification<?> build();


}