/*
    Version de Kernel 5.11.0-41-generic
*/
#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>


#include <linux/proc_fs.h>
#include <asm/uaccess.h>	    //Lee archivos de proc, hay que leer una libraria y se carga a un struct?
#include <linux/seq_file.h>     //Escribir en el proc

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Ejemplo creacion de modulo en Linux, Laboratorio Sistemas Operativos 1");
MODULE_AUTHOR("Bernald Renato Paxtor Peren");

//nombre variable, parametros de cajon
static int escribir_archivo(struct seq_file *archivo, void *v)
{   

    seq_printf(archivo, "*********************************************\n");//IMprime algo
    seq_printf(archivo, "*********************************************\n");
    seq_printf(archivo, "**    LABORATORIO SISTEMAS OPERATIVOS 1    **\n");
    seq_printf(archivo, "**       EJEMPLO CREACION DE MODULOS       **\n");
    seq_printf(archivo, "**       BERNALD RENATO PAXTOR PEREN       **\n");
    seq_printf(archivo, "*********************************************\n");
    seq_printf(archivo, "*********************************************\n");
    return 0;
}

//Funcion que se ejecutara cada vez que se lea el archivo con el comando CAT
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

//Si el kernel es 5.6 o mayor se usa la estructura proc_ops
static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

//Funcion a ejecuta al insertar el modulo en el kernel con insmod
static int _insert(void)
{
    proc_create("ejemplo", 0, NULL, &operaciones);
    printk(KERN_INFO "Mensaje al insertar modulo, Laboratorio SO 1\n");
    return 0;
}

//Funcion a ejecuta al remover el modulo del kernel con rmmod
static void _remove(void)
{
    remove_proc_entry("ejemplo", NULL);
    printk(KERN_INFO "Mensaje al remover modulo, Laboratorio SO 1\n");
}

module_init(_insert);
module_exit(_remove);