<template>
  <div class="edit-pdf-container">
    
  </div>
</template>

<script>
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import {  downloadBlob } from "@/utils/index.js";

export default {
  data () {
    return {
      pdfFileUrl: './static/1.pdf'
    }
  },
  created () {
    console.log(this.$pdfLib)
    this.handlerPdf()
  },
  methods: {
    async handlerPdf () {
      const existingPdfBytes = await fetch(this.pdfFileUrl).then(res => res.arrayBuffer())
      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const pages = pdfDoc.getPages()
      const firstPage = pages[0]
      const { width, height } = firstPage.getSize()
      firstPage.drawText('This text was added with JavaScript!', {
        x: 5,
        y: height / 2 + 300,
        size: 50,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
        rotate: degrees(-45),
      })
      const pdfBytes = await pdfDoc.save()
      downloadBlob(pdfBytes, "application/octet-stream", "name.pdf");
    }
  }
}
</script>

<style>
.edit-pdf-container{
  
}
</style>