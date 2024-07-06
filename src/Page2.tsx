import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface Department {
  department: string;
  sub_departments: string[];
}[]
const Page2 = () => {
  const departments:Department[]= [
    {
      "department": "customer_service",
      "sub_departments": [
        "support",
        "customer_success"
      ]
    },
    {
      "department": "design",
      "sub_departments": [
        "graphic_design",
        "product_design",
        "web_design"
      ]
    }
    ]
  
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(true); 
  const [check,setCheck] = React.useState([[true,true],[true,true,true]])
  const[open,setOpen]=React.useState([false,false])

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        setPosts(data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false); 
      }
    };

    fetchPosts();
  }, []); 
  const handleChange1 = (e:React.SyntheticEvent<Element, Event>, index: number) => {
    setCheck(prev => {
      const length = prev[index].length;
       
        const newCheck = [...prev];
        
        for(let i=0;i<length;i++){
          newCheck[index][i] = (e.target as HTMLInputElement).checked;
        }
       
        return newCheck;
    });
  };
  
   
  
  const checkAll = (length: number, val: number): boolean => {
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(check[val][i] !== true ? false : true);
    }
    return arr.includes(false) ? false : true;
  };
  
  if (loading) {
    return <div>Loading...</div>; 
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, inde: number, ind: number): void => {
    setCheck((prev) => {
   
      const newCheck = [...prev];
     
      newCheck[inde] = [...newCheck[inde]];
      newCheck[inde][ind] = e.target.checked;
      return newCheck;
    });
  };
  return (
    <div>
      <h1>Data Grid Example</h1>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={posts}
        columns={[
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'title', headerName: 'Title', width: 250 },
          { field: 'body', headerName: 'Body', width: 350 },
        ]}
        autoPageSize
        checkboxSelection
        
/>
      </Box>
      <Box>
       {
        departments.map((dep,inde)=>{
          const length = dep.sub_departments.length
          return (
            <Box key={inde}>
            <FormControlLabel  label={dep.department} 
                   control={<Checkbox checked={checkAll(length,inde) } />}
                    onChange={(e)=>handleChange1(e,inde)}/>
                    <ArrowDownwardIcon onClick={()=>setOpen(prev=>prev.map((val,ind)=>inde===ind?!val:val))}/>
                    {open[inde] &&
                      dep.sub_departments.map((subdep,ind)=>{
                        return <Box key={ind}>
                        <FormControlLabel label={subdep} control={<Checkbox  name={subdep} checked={check[inde][ind]} onChange={(e)=>handleChange(e,inde,ind)} />}/>
                        </Box>
                      })
                    }
                    </Box>
                  )
          }
               
          )
        }
         </Box>
         
     
    </div>
  );
};

export default Page2;
