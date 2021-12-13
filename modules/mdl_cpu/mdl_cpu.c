#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h>	    
#include <linux/seq_file.h>
#include <linux/hugetlb.h>            
#include <linux/sched.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo para lectura de cpu para Ubuntu 20.04.3 con Kernel 5.11.0-41-generic");
MODULE_AUTHOR("Oscar Leon");

struct task_struct *procesos,*sub_proceso;
struct list_head *subProcesos;


static int getCpuInfo(struct seq_file *archivo, void *v)
{   
    seq_printf(archivo,"[\n");
    for_each_process(procesos){
        seq_printf(archivo,"{\n");
        seq_printf(archivo,"\tid:%d,\n",procesos->pid);
        seq_printf(archivo,"\tnombre:\"%s\",\n",procesos->comm);
        seq_printf(archivo,"\testado:%li,\n",procesos->state);
       // seq_printf(archivo,"\tuser:%d,\n",procesos->__user);
        seq_printf(archivo,"\tram:%d,\n",__kuid_val(procesos->real_cred->uid));

        seq_printf(archivo,"\thijos:[\n");

        list_for_each(subProcesos,&(procesos->children)){
            sub_proceso=list_entry(subProcesos,struct task_struct, sibling);
            seq_printf(archivo,"\t\t%d,\n",sub_proceso->pid);
        }
        seq_printf(archivo,"\t]\n");
        seq_printf(archivo,"},\n");

    }  
    seq_printf(archivo,"]\n");
    return 0;
}

static int lectura(struct inode *inode, struct file *file)
{
    return single_open(file, getCpuInfo, NULL);
}

static struct proc_ops info =
{
    .proc_open = lectura,
    .proc_read = seq_read
};

static int _montar(void)
{
    proc_create("mdl_cpu", 0, NULL, &info);
    printk(KERN_INFO "Modulo de Cpu montado en el kernel Oscar Roberto Velásquez León\n");
    return 0;
}

static void _desmontar(void)
{
    remove_proc_entry("mdl_cpu", NULL);
    printk(KERN_INFO "Modulo de Cpu desmontado en el kernel Diciembre 2021\n");
}

module_init(_montar);
module_exit(_desmontar);