#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <asm/uaccess.h>	    
#include <linux/seq_file.h>     
#include <linux/hugetlb.h>     

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo para lectura de ram para Ubuntu 20.04.3 con Kernel 5.11.0-41-generic");
MODULE_AUTHOR("Oscar Leon");

struct sysinfo inf;

static int getRamInfo(struct seq_file *archivo, void *v)
{   
    long totalram;
    long freeram ;
    long sharedram ;
    long bufferram ;
    long totalswap;
    long freeswap ;
    long mem_unit;
    long ram_total;
    long ram_ocupada;
    long ram_porcentaje;
    seq_printf(archivo, "Leyendo informacion de RAM...\n");
    si_meminfo(&inf);
    totalram = inf.totalram;
    freeram = inf.freeram;
    sharedram = inf.sharedram;
    bufferram = inf.bufferram;
    totalswap = inf.totalswap;
    freeswap = inf.freeswap;
    mem_unit = inf.mem_unit;
    ram_total=totalram*mem_unit/1024/1024;
    ram_ocupada=(freeram*mem_unit/1024/1024);
    ram_porcentaje=ram_ocupada*100/ram_total;
    seq_printf(archivo, "\nRAM TOTAL: %li mb",ram_total);
    seq_printf(archivo, "\nRAM Ocupada: %li mb",ram_ocupada);
    seq_printf(archivo, "\nPorcentaje: %li \n",ram_porcentaje);

    seq_printf(archivo, "\ntotalram: %li",totalram);
    seq_printf(archivo, "\nfreeram: %li",freeram);
    seq_printf(archivo, "\nsharedram: %li",sharedram);
    seq_printf(archivo, "\nbufferram: %li",bufferram);
    seq_printf(archivo, "\ntotalswap: %li",totalswap);
    seq_printf(archivo, "\nfreeswap: %li",freeswap);
    seq_printf(archivo, "\nfmem_unit: %li \n",mem_unit);
    

    return 0;
}

static int lectura(struct inode *inode, struct file *file)
{
    return single_open(file, getRamInfo, NULL);
}

static struct proc_ops info =
{
    .proc_open = lectura,
    .proc_read = seq_read
};

static int _montar(void)
{
    proc_create("mdl_ram", 0, NULL, &info);
    printk(KERN_INFO "Modulo de RAM montado en el kernel...\n");
    return 0;
}

static void _desmontar(void)
{
    remove_proc_entry("mdl_ram", NULL);
    printk(KERN_INFO "Modulo de RAM desmontado en el kernel...\n");
}

module_init(_montar);
module_exit(_desmontar);