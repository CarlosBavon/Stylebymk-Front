<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <html>
      <head><title>XML Sitemap</title></head>
      <body>
        <h2>Sitemap</h2>
        <ul>
          <xsl:for-each select="urlset/url">
            <li><a><xsl:attribute name="href"><xsl:value-of select="loc"/></xsl:attribute><xsl:value-of select="loc"/></a></li>
          </xsl:for-each>
        </ul>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>