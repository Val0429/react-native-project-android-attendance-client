package com.attendanceclient;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

import android.content.Context;
import android.graphics.Bitmap;
import android.os.Environment;
  
public class FileUtils {  

    private static int FILESIZE = 1 * 1024;

    public static File createSDFile(String fileName) throws IOException{
        File file = new File(fileName);
        file.createNewFile();  
        return file;  
    }  

    public static boolean deleteSDFile(String szFileName) throws IOException{
        File file = new File(szFileName);
        return file.delete();  
    }         

    public static File createSDDir(String dirName){
        File dir = new File(dirName);
        dir.mkdirs();  
        return dir;  
    }  
      
    public static boolean isFileExist(String fileName){
         File file = new File(fileName);  
        return file.exists();  
    }

    public static byte[] Bitmap2Bytes(Bitmap bm){
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bm.compress(Bitmap.CompressFormat.PNG, 100, baos);
        return baos.toByteArray();
    }

    public static File writeToSDFromInput(String path,String fileName, byte[] input){
        File file = null;  
        OutputStream output = null;  
        try {  
            createSDDir(path);  
            file = createSDFile(path + "/" + fileName);  
            output = new FileOutputStream(file);
            output.write(input, 0, input.length);
        }   
        catch (Exception e) {  
            e.printStackTrace();  
        }  
        finally{  
            try {
                output.close();  
            } catch (IOException e) {  
                e.printStackTrace();  
            }  
        }  
        return file;  
    }

    public static File writeToSDFromInput(String path,String fileName, InputStream input){
        File file = null;
        OutputStream output = null;
        try {
            createSDDir(path);
            file = createSDFile(path + "/" + fileName);
            output = new FileOutputStream(file);
            byte[] buffer = new byte[FILESIZE];

            int nDownLoadFilePosition = 0;
            int nNumread;
            while ((nNumread = input.read(buffer)) != -1)
            {
                output.write(buffer, 0, nNumread);
                nDownLoadFilePosition += nNumread;
            }

        }
        catch (Exception e) {
            e.printStackTrace();
        }
        finally{
            try {
                input.close();
                output.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return file;
    }

    public static void deleteDirectory(File fileOrDirectory) {

        if (fileOrDirectory.isDirectory()) {
            for (File child : fileOrDirectory.listFiles()) {
                deleteDirectory(child);
            }
        }

        fileOrDirectory.delete();
    }


    public static String getDiskCacheDir(Context context) {
        String cachePath = null;
        if (Environment.MEDIA_MOUNTED.equals(Environment.getExternalStorageState())
                || !Environment.isExternalStorageRemovable()) {
            cachePath = context.getExternalCacheDir().getPath();
        } else {
            cachePath = context.getCacheDir().getPath();
        }
        return cachePath;
    }

    // get LogCat file (only E, W, and I)
    public static File getLogCat(Context context) {
        // set a file
        String fullName = getDiskCacheDir(context) + "-logcat.txt";
        File file = new File(fullName);

        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

        // get logcat to file
        int pid = android.os.Process.myPid();
        try {
            String command = String.format("logcat -d -v threadtime *:*");
            Process process = Runtime.getRuntime().exec(command);

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder result = new StringBuilder();
            String currentLine = null;

            while ((currentLine = reader.readLine()) != null) {
                if (currentLine != null && currentLine.contains(String.valueOf(pid))) {
                    if (currentLine.contains("W ") || currentLine.contains("E ") || currentLine.contains("I ")) {
                        result.append(currentLine);
                        result.append("\n");
                    }
                }
            }

            FileWriter out = new FileWriter(file);
            out.write(result.toString());
            out.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return file;
    }
}   